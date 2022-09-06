import Container from "../commons/container/Container"
import path from "path"
import { GenericContainer, StartedTestContainer } from "testcontainers"
import { ContainerFactory } from "../commons/container/ContainerFactory"
import modules from "../infra/config/modules"
import RequestContext from "../infra/context/RequestContext"
import { ApplicationContextIdentifier, RequestContextIdentifier } from "../infra/config/identifiers"
import GenericModule from "../commons/container/GenericModule"

declare global {
  var app: Container
  var databaseContainer: StartedTestContainer
  var redisContainer: StartedTestContainer
}

async function makeTestRedis() {

  return await new GenericContainer("redis")
    .withExposedPorts(6379)
    .start()
    
}

async function makeTestDatabase() {

  const buildContext = path.resolve(__dirname, "database")

  const image = await GenericContainer.fromDockerfile(buildContext).build()

  return await image
    .withExposedPorts(3306)
    .start()

}

async function makeTestContainer(context: RequestContext) {
  
  const appContextModule = new GenericModule(ApplicationContextIdentifier, context)
  const requestContextModule = new GenericModule(RequestContextIdentifier, context)

  const factory = new ContainerFactory()
  factory.addModules(modules)
  factory.addModule(appContextModule)
  factory.addModule(requestContextModule)

  const container = factory.getContainer({ scope: "REQUEST" })

  return container

}

export default async function() {
  
  global.databaseContainer = await makeTestDatabase()
  global.redisContainer = await makeTestRedis()

  const testContext: RequestContext = {
    
    env: "TEST",

    database: {
      host: "localhost",
      user: "root",
      password: "12345",
      port: global.databaseContainer.getMappedPort(3306),
      database: "PHD"
    },

    redis: {
      url: `redis://localhost:${ global.redisContainer.getMappedPort(6379) }`
    },

    request: null,
    response: null

  }
  
  global.app = await makeTestContainer(testContext)

}