import Container from "../core/container/Container"
import path from "path"
import { GenericContainer, StartedTestContainer } from "testcontainers"
import makeApplicationContainer from "../infra/container/makeApplicationContainer"
import ApplicationContext from "../infra/container/ApplicationContext"
import makeRequestContainer from "../infra/container/makeRequestContainer"

declare global {
  var app: Container
  var databaseContainer: StartedTestContainer
}

async function makeTestDatabase() {

  const buildContext = path.resolve(__dirname, "database")

  const image = await GenericContainer.fromDockerfile(buildContext).build()

  return await image
    .withExposedPorts(3306)
    .start()
}

async function makeTestContainer(context: ApplicationContext) {

  const appContainer = makeApplicationContainer(context)
  const requestContainer = makeRequestContainer(appContainer)

  return requestContainer

}

export default async function() {
  
  global.databaseContainer = await makeTestDatabase()

  const testContext: ApplicationContext = {
    
    env: "TEST",

    database: {
      host: "localhost",
      user: "root",
      password: "12345",
      port: global.databaseContainer.getMappedPort(3306),
      database: "PHD"
    }

  }
  
  global.app = await makeTestContainer(testContext)

}