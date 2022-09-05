import Container, { Builder, Finalizer, DependencyIdentifier } from "./Container"

export default class ContainerBuilder {

  private builders: { [key: string]: Builder<any>; } = {}
  private finalizers: [ string, Finalizer<any> ][] = []
  private objects: { [key: string]: any; } = {}
  private parent?: Container

  constructor(parent?: Container) {
    this.parent = parent
  }

  register<T>(id: DependencyIdentifier<T>, builder: Builder<T>): void {
    this.builders[id.key] = builder;
  }

  registerFinalizer<T>(id: DependencyIdentifier<T>, finalizer: Finalizer<T>): void {
    this.finalizers.push([ id.key, finalizer ]);
  }

  put<T>(id: DependencyIdentifier<T>, object: T): void {
    this.objects[id.key] = object;
  }

  build(): Container {
    return new Container({ ...this.builders }, { ...this.finalizers }, { ...this.objects }, this.parent)
  }

}
