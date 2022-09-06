import { EncryptServiceIdentifier } from "../config/identifiers"
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import BcryptEncryptService from "./BcryptEncryptService"
import Scope from "../../commons/container/Scope"

export default class SecurityModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope }): void {
    
    if (context.scope !== "SINGLETON") return

    builder.put(EncryptServiceIdentifier, new BcryptEncryptService())

  }

}