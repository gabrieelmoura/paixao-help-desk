import Container from "../../commons/container/Container"
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import LoginCommand from "../../core/command/LoginCommand"
import { AuthServiceIdentifier, EncryptServiceIdentifier, LoginCommandIdentifier, UserRepositoryIdentifier } from "../config/identifiers"

export default class CommandModule implements Module {

  register(builder: ContainerBuilder, context: { scope: string; }): void {

    if (context.scope !== "REQUEST") return

    builder.register(LoginCommandIdentifier, this.createLoginCommand)

  }

  async createLoginCommand(app: Container) {
    const userRepository = await app.get(UserRepositoryIdentifier)
    const encryptService = await app.get(EncryptServiceIdentifier)
    const authService = await app.get(AuthServiceIdentifier)
    return new LoginCommand(
      userRepository,
      encryptService,
      authService
    )  
  }

}