import ContainerBuilder from "./ContainerBuilder"
import Scope from "./Scope"

export default interface Module {

  register(builder: ContainerBuilder, context: { scope: Scope }): void

}