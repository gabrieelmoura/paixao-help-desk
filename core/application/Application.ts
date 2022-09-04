
export type Builder<T> = (app: Application) => Promise<T>

export interface DependencyIdentifier<T> {
  _?: T
  key: string
}

export type Finalizer<T> = (object: T) => Promise<void>

export default class Application {

  constructor(
    private builders: { [ key: string ]: Builder<any> },
    private finalizers: { [ key: string ]: Finalizer<any> },
    private objects: { [ key: string ]: any }
  ) {}

  async get<T>(id: DependencyIdentifier<T>): Promise<T> {

    if (this.objects[id.key] === undefined) {
      this.objects[id.key] = await this.builders[id.key](this)  
    }

    return this.objects[id.key]

  }

  async end(): Promise<void> {
    
    for (const key in this.finalizers) {
      if (this.objects[key] !== undefined) {
        await this.finalizers[key](this.objects[key])
      }
    }

  }

}