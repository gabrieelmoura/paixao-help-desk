import Container, { Builder, Finalizer, DependencyIdentifier, ContainerBinding, Type } from "./Container"

export default class ContainerBuilder {

  private bindings: { [ key: string ]: ContainerBinding<any> } = {}
  private parent?: Container

  constructor(parent?: Container) {
    this.parent = parent
  }

  register<T>(id: DependencyIdentifier<T>, builder: Builder<T>): void {
    this.bindings[id.key] = {
      id, builder
    };
  }

  registerFinalizer<T>(id: DependencyIdentifier<T>, finalizer: Finalizer<T>): void {
    this.bindings[id.key].finalizer = finalizer
  }

  put<T>(id: DependencyIdentifier<T>, object: T): void {
    this.bindings[id.key] = {
      id, builder: () => Promise.resolve(object)
    };
  }

  build(): Container {
    return new Container({ ...this.bindings }, this.parent)
  }

}
