import ConnectionPool from "../../core/database/ConnectionPool"
import Container from "../../commons/container/Container"
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import MysqlConnectionPool from "./MysqlConnectionPool"
import MysqlDatabase from "./MysqlDatabase"
import { ApplicationContextIdentifier, ConnectionPoolIdentifier, DatabaseIdentifier } from "../config/identifiers"
import Scope from "../../commons/container/Scope"

export default class MysqlModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope }): void {

    if (context.scope === "SINGLETON") {
      builder.register(ConnectionPoolIdentifier, this.createConnectionPool)
      builder.registerFinalizer(ConnectionPoolIdentifier, this.closeConnectionPool)
    }

    builder.register(DatabaseIdentifier, this.createDatabase)

  }

  async createConnectionPool(app: Container) {
    const context = await app.get(ApplicationContextIdentifier)
    return new MysqlConnectionPool(context)
  }

  async closeConnectionPool(pool: ConnectionPool) {
    await pool.closePool()
  }

  async createDatabase(app: Container) {
    return new MysqlDatabase(await app.get(ConnectionPoolIdentifier))
  }

}