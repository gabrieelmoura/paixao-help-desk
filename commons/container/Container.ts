
export type Builder<T> = (app: Container) => Promise<T>

export interface DependencyIdentifier<T> {
  _?: T
  key: string
}

export type Finalizer<T> = (object: T) => Promise<void>

export interface ContainerBinding<T> {
  id: DependencyIdentifier<T>
  builder: Builder<T>
  finalizer?: Finalizer<T>
  instance?: T
}

export default class Container {

  private destructStack: string[] = []

  constructor(
    private bindings: { [ key: string ]: ContainerBinding<any> },
    private parent?: Container
  ) {}

  async get<T>(id: DependencyIdentifier<T>): Promise<T> {

    if (this.bindings[id.key]?.instance !== undefined) {
      return this.bindings[id.key]?.instance
    }

    if (this.bindings[id.key] !== undefined) {
      const newObject = await this.bindings[id.key].builder(this)
      this.destructStack.unshift(id.key)
      return this.bindings[id.key].instance = newObject
    }

    if (this.parent !== undefined) {
      return this.parent.get(id)
    }

    throw new Error("Dependency " + id.key + " not registed")

  }

  async end(recursive: boolean = false): Promise<void> {
    
    for (let i = 0; i < this.destructStack.length; i++) {
      const key = this.destructStack[i]
      if (this.bindings[key].finalizer !== undefined) {
        await this.bindings[key].finalizer?.(this.bindings[key].instance)
      }
    }

    if (recursive && this.parent !== undefined) {
      await this.parent.end()
    }

  }

}