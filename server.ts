import { ContainerFactory } from "./commons/container/ContainerFactory"
import { HttpServerIdentifier } from "./infra/config/identifiers"
import modules from "./infra/config/modules"

async function start() {

  const containerFactory = new ContainerFactory({ modules })
  const container = containerFactory.getContainer()

  const httpServer = await container.get(HttpServerIdentifier)

  httpServer.listen(3000)

}

try {
  start()
} catch (err) {
  console.error(err)
}