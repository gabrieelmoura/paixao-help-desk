import axios from "axios"
import { GenericContainer, StartedTestContainer } from "testcontainers"
import Application from "../core/application/Application"

declare global {
  var application: Application
}

describe.skip("TestContainers", () => {

  let container: StartedTestContainer
  
  beforeAll(async () => {
    container = await new GenericContainer("nginx")
      .withExposedPorts(80)
      .start();
  }, 1000000)

  it("Container is alive", async () => {
    await axios.get(`http://${ container.getHost() }:${ container.getMappedPort(80) }/`)
  })

  afterAll(async () => {
    await container.stop()
  })

})