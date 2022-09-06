import Container from "./Container"
import ContainerBuilder from "./ContainerBuilder"
import Module from "./Module"
import Scope from "./Scope"

export class ContainerFactory {

  private modules: Module[]

  constructor(
    modules: Module[] = []
  ) {
    this.modules = [ ...modules ]
  }

  public addModule(module: Module) {
    this.modules.push(module)
  }

  public addModules(modules: Module[]) {
    this.modules.push(...modules)
  }

  public getContainer(params: { scope?: Scope, base?: Container } = {}) {

    const { base, scope = "SINGLETON" } = params

    let container: Container | undefined = base

    const scopes: Scope[] = [ "SINGLETON", "REQUEST" ]
    const lastIndex = scopes.indexOf(scope) + 1

    for (let i = 0; i < lastIndex; i++) {
      var builder = new ContainerBuilder(container)
      this.modules.forEach(m => m.register(builder, { scope: scopes[i] }))
      container = builder.build()
    }

    return container as Container

  }

}