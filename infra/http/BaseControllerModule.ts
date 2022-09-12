import Container, { Builder, DependencyIdentifier } from "../../commons/container/Container"
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import { ContainerFactory } from "../../commons/container/ContainerFactory"
import GenericModule from "../../commons/container/GenericModule"
import Module from "../../commons/container/Module"
import Scope from "../../commons/container/Scope"
import Request from "../../core/http/Request"
import Response from "../../core/http/Response"
import { RequestContextIdentifier } from "../config/identifiers"
import modules from "../config/modules"

export type Type<T> = new (...args: any[]) => T

export class ControllerContainerBuilder {

  constructor(
    private builder: ContainerBuilder
  ) {}

  register<T>(id: DependencyIdentifier<T>, type: Type<T>, dependencyBuilder: Builder<T>): void {
    this.builder.register(id, async container => {
      const factory = new ControllerDelegateFactory(container, type, dependencyBuilder)
      const controller = factory.createController()
      return controller
    })
    
  }

}

export class ControllerDelegateFactory<C> {

  constructor(
    private container: Container,
    private type: Type<C>,
    private builder: Builder<C>
  ) {}

  createController(): C {

    const delegate = {} as any
    const prototype = this.type.prototype

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

export default abstract class BaseControllerModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope }): void {

    if (context.scope !== "SINGLETON") return
    
    const controllerBuilder = new ControllerContainerBuilder(builder)

    this.registerControllers(controllerBuilder)
    
  }

  abstract registerControllers(builder: ControllerContainerBuilder): void

}