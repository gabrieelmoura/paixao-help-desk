
export type Builder<T> = (app: Container) => Promise<T>

export interface DependencyIdentifier<T> {
  _?: T
  key: string
}

export type Finalizer<T> = (object: T) => Promise<void>

export default class Container {

  private destructStack: string[] = []

  constructor(
    private builders: { [ key: string ]: Builder<any> },
    private finalizers: { [ key: string]: Finalizer<any> },
    private objects: { [ key: string ]: any },
    private parent?: Container
  ) {}

  async get<T>(id: DependencyIdentifier<T>): Promise<T> {

    if (this.objects[id.key] !== undefined) {
      return this.objects[id.key]
    }

    if (this.builders[id.key] !== undefined) {
      const newObject = await this.builders[id.key](this)
      this.destructStack.unshift(id.key)
      return this.objects[id.key] = newObject
    }

    if (this.parent !== undefined) {
      return this.parent.get(id)
    }

    throw new Error("Dependency " + id.key + " not registed")

  }

  async end(recursive: boolean = false): Promise<void> {
    
    for (let i = 0; i < this.destructStack.length; i++) {
      const key = this.destructStack[i]
      if (this.finalizers[key] !== undefined) {
        await this.finalizers[key](this.objects[key])
      }
    }

    if (recursive && this.parent !== undefined) {
      await this.parent.end()
    }

  }

}