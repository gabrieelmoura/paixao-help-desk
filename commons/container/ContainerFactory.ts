import Container from "./Container"
import ContainerBuilder from "./ContainerBuilder"
import Module from "./Module"

interface Params { 
  scopes?: string[]
  scope?: string,
  base?: Container
  modules?: Module[] 
}

export class ContainerFactory {

  scopes: string[]
  scope: string
  base: Container | undefined
  modules: Module[]

  constructor(params: Params = {}) {
    this.scopes = params.scopes || [ "SINGLETON", "REQUEST" ]
    this.scope = params.scope || "SINGLETON"
    this.base = params.base
    this.modules = params.modules || []
  }

  public getContainer() {

    const lastIndex = this.scopes.indexOf(this.scope) + 1
    let container = this.base

    for (let i = 0; i < lastIndex; i++) {
      var builder = new ContainerBuilder(container)
      this.modules.forEach(m => m.register(builder, { scope: this.scopes[i] as any }))
      container = builder.build()
    }

    return container as Container

  }

}