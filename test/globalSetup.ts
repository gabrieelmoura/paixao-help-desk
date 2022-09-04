import Application from "../core/application/Application"
import ApplicationFactory from "../infra/application/ApplicationFactory"
import path from "path"
import { GenericContainer, StartedTestContainer } from "testcontainers"

declare global {
  var app: Application
  var databaseContainer: StartedTestContainer
}

async function makeTestDatabase() {

  const buildContext = path.resolve(__dirname, "database")

  const image = await GenericContainer.fromDockerfile(buildContext).build()

  return await image
    .withExposedPorts(3306)
    .start()
}

async function makeTestApplication(params: { databasePort: number }) {
  
  const factory = new ApplicationFactory()

  return await factory.create({
  
    env: "TEST",
  
    database: {
      host: "localhost",
      user: "root",
      password: "12345",
      port: params.databasePort,
      database: "PHD"
    }
  
  })

}

export default async function() {
  
  global.databaseContainer = await makeTestDatabase();
  global.app = await makeTestApplication({ 
    databasePort: global.databaseContainer.getMappedPort(3306)
  });

}