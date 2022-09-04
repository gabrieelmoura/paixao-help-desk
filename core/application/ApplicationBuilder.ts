import Application, { Builder, Finalizer, DependencyIdentifier } from "./Application"

export class ApplicationBuilder {

  private builders: { [key: string]: Builder<any>; } = {}
  private finalizers: { [key: string]: Finalizer<any>; } = {}
  private objects: { [key: string]: any; } = {}

  register<T>(id: DependencyIdentifier<T>, builder: Builder<T>): void {
    this.builders[id.key] = builder;
  }

  registerFinalizer<T>(id: DependencyIdentifier<T>, finalizer: Finalizer<T>): void {
    this.finalizers[id.key] = finalizer;
  }

  put<T>(id: DependencyIdentifier<T>, object: T): void {
    this.objects[id.key] = object;
  }

  clone(): ApplicationBuilder {
    const builder = new ApplicationBuilder();
    builder.builders = this.builders;
    builder.finalizers = this.finalizers;
    builder.objects = this.objects;
    return builder;
  }

  build(): Application {
    return new Application({ ...this.builders }, { ...this.finalizers }, { ...this.objects })
  }

}
