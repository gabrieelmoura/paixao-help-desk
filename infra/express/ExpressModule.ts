import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import Scope from "../../commons/container/Scope"
import Container from "../../commons/container/Container"
import { HttpServerIdentifier, IndexControllerIdentifier, RouterIdentifier, UserControllerIdentifier } from "../config/identifiers"
import HttpServer from "../../core/http/HttpServer"
import ExpressHttpServer from "./ExpressHttpServer"
import Router from "../../core/http/Router"

export default class ExpressModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope; }): void {

    if (context.scope !== "SINGLETON") return

    builder.register(HttpServerIdentifier, this.createHttpServer)

    builder.register(RouterIdentifier, this.createRouter)
    
  }

  private async createHttpServer(app: Container): Promise<HttpServer> {
    const router = await app.get(RouterIdentifier)
    const server = new ExpressHttpServer()
    router.registerRoutes(server)
    return server
  }

  private async createRouter(app: Container): Promise<Router> {
    const indexController = await app.get(IndexControllerIdentifier)
    const userController = await app.get(UserControllerIdentifier)

    return new Router(
      indexController,
      userController
    )
  }

}