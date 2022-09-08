import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import Scope from "../../commons/container/Scope"
import modules from "../config/modules"
import Request from "../../core/http/Request"
import Response from "../../core/http/Response"
import Container, { Builder, DependencyIdentifier } from "../../commons/container/Container"
import { ContainerFactory } from "../../commons/container/ContainerFactory"
import GenericModule from "../../commons/container/GenericModule"
import { HttpServerIdentifier, IndexControllerIdentifier, RequestContextIdentifier, RouterIdentifier, UserControllerIdentifier } from "../config/identifiers"
import UserController from "../../core/controller/UserController"
import HttpServer from "../../core/http/HttpServer"
import ExpressHttpServer from "./ExpressHttpServer"
import Router from "../../core/http/Router"
import IndexController from "../../core/controller/IndexController"

export default class ExpressModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope; }): void {

    if (context.scope !== "SINGLETON") return

    builder.register(HttpServerIdentifier, this.createHttpServer)

    this.registerController(builder, IndexControllerIdentifier, this.createIndexController )
    this.registerController(builder, UserControllerIdentifier, this.createUserController )

    builder.register(RouterIdentifier, this.createRouter)
    
  }

  private async createHttpServer(app: Container): Promise<HttpServer> {
    const router = await app.get(RouterIdentifier)
    const server = new ExpressHttpServer()
    router.registerRoutes(server)
    return server
  }

  private async createUserController(app: Container): Promise<UserController> {
    return new UserController(null as any)
  }

  private async createIndexController(app: Container): Promise<IndexController> {
    return new IndexController()
  }

  private async createRouter(app: Container): Promise<Router> {
    const indexController = await app.get(IndexControllerIdentifier)
    const userController = await app.get(UserControllerIdentifier)

    return new Router(
      indexController,
      userController
    )
  }

  private registerController<C>(builder: ContainerBuilder, id: DependencyIdentifier<C>, dependencyBuilder: Builder<C> ) {
    builder.register(id, async container => {
      const factory = new ControllerDelegateFactory(container, id, dependencyBuilder)
      const controller = factory.createController()
      return controller
    })
  }

}

class ControllerDelegateFactory<C> {

  constructor(
    private container: Container,
    private id: DependencyIdentifier<C>,
    private builder: Builder<C>
  ) {}

  createController(): C {

    const delegate = {} as any
    const prototype = this.id.type!.prototype

    Object.getOwnPropertyNames(prototype).filter(attr => attr !== "constructor").forEach(attr => {
      
      const fn = async (request: Request<any>, response: Response<any>) => {

        const requestContext = { request, response }
  
        const containerFactory = new ContainerFactory({
          modules: [ ...modules, new GenericModule(RequestContextIdentifier, requestContext) ],
          base: this.container,
          scope: "REQUEST"
        })
  
        const requestContainer = containerFactory.getContainer()
  
        const controller = await this.builder(requestContainer) as any
  
        return controller[attr](request, response)
      }

      delegate[attr] = fn

    })

    return delegate as any
  }

}