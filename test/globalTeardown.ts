import { StartedTestContainer } from "testcontainers"
import Container from "../commons/container/Container"

declare global {
  var app: Container
  var databaseContainer: StartedTestContainer
  var redisContainer: StartedTestContainer
}

export default async function() {
  await app.end(true)
  await databaseContainer.stop()
  await redisContainer.stop()
}