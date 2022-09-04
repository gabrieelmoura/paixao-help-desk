import { StartedTestContainer } from "testcontainers"
import Application from "../core/application/Application"

declare global {
  var app: Application
  var databaseContainer: StartedTestContainer
}

export default async function() {
  await app.end()
  await databaseContainer.stop()
}