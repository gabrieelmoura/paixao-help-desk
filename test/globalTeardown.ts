import { StartedTestContainer } from "testcontainers"
import Container from "../core/container/Container"

declare global {
  var app: Container
  var databaseContainer: StartedTestContainer
}

export default async function() {
  await app.end(true)
  await databaseContainer.stop()
}