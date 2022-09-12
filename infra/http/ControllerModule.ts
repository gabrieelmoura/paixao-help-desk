import Container from "../../commons/container/Container"
import IndexController from "../../core/controller/IndexController"
import UserController from "../../core/controller/UserController"
import { IndexControllerIdentifier, UserControllerIdentifier } from "../config/identifiers"
import BaseControllerModule, { ControllerContainerBuilder } from "./BaseControllerModule"

export default class ControllerModule extends BaseControllerModule {

  registerControllers(builder: ControllerContainerBuilder): void {
    
    builder.register(IndexControllerIdentifier, IndexController, this.createIndexController)
    builder.register(UserControllerIdentifier, UserController, this.createUserController)

  }

  private async createIndexController(app: Container): Promise<IndexController> {
    return new IndexController()
  }

  private async createUserController(app: Container): Promise<UserController> {
    return new UserController(null as any)
  }

}