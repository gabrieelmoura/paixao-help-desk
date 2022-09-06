import { DependencyIdentifier } from "./Container";
import ContainerBuilder from "./ContainerBuilder";
import Module from "./Module"
import Scope from "./Scope";

export default class GenericModule<T> implements Module {

  constructor(
    private key: DependencyIdentifier<T>, 
    private instance: T
  ) {}

  register(builder: ContainerBuilder, context: { scope: Scope; }): void {
    builder.put(this.key, this.instance)
  }

}