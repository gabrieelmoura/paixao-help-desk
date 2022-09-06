import { DatabaseIdentifier, UserRepositoryIdentifier } from "../config/identifiers"
import Container from "../../commons/container/Container"
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import DBUserRepository from "./DBUserRepository"

export default class RepositoryModule implements Module {

  register(builder: ContainerBuilder): void {
    
    builder.register(UserRepositoryIdentifier, this.createDBUserRepository)

  }

  async createDBUserRepository(app: Container) {
    return new DBUserRepository(await app.get(DatabaseIdentifier))
  }

}