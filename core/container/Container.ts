
export type Builder<T> = (app: Container) => Promise<T>

export interface DependencyIdentifier<T> {
  _?: T
  key: string
}

export type Finalizer<T> = (object: T) => Promise<void>

export default class Container {

  constructor(
    private builders: { [ key: string ]: Builder<any> },
    private finalizers: [ string, Finalizer<any> ][],
    private objects: { [ key: string ]: any },
    private parent?: Container
  ) {}

  async get<T>(id: DependencyIdentifier<T>): Promise<T> {

    if (this.objects[id.key] !== undefined) {
      return this.objects[id.key]
    }

    if (this.builders[id.key] !== undefined) {
      return this.objects[id.key] = await this.builders[id.key](this)  
    }

    if (this.parent !== undefined) {
      return this.parent.get(id)
    }

    throw new Error("Dependency " + id.key + " not registed")

  }

  async end(recursive: boolean = false): Promise<void> {
    
    for (let i = 0; i < this.finalizers.length; i++) {
      const entry = this.finalizers[i]
      if (this.objects[entry[0]] !== undefined) {
        await entry[1](this.objects[entry[0]])
      }
    }

    if (recursive && this.parent !== undefined) {
      await this.parent.end()
    }

  }

}