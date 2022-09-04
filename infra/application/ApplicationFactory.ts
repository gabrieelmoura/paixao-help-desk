import { UserRepositoryIdentifier } from "../../core/repository/UserRepository"
import Application from "../../core/application/Application"
import { ApplicationBuilder } from "../../core/application/ApplicationBuilder"
import DBUserRepository from "../repository/DBUserRepository"
import { DatabaseIdentifier } from "../../core/database/Database"
import ApplicationContext, { ApplicationContextIdentifier } from "./ApplicationContext"
import ConnectionPool, { ConnectionPoolIdentifier } from "../../core/database/ConnectionPool"
import MysqlConnectionPool from "../mysql/MysqlConnectionPool"
import MysqlDatabase from "../mysql/MysqlDatabase"

export default class ApplicationFactory {

  private builder: ApplicationBuilder

  constructor() {

    this.builder = new ApplicationBuilder()
  
    this.builder.register(ConnectionPoolIdentifier, this.createConnectionPool)
    this.builder.registerFinalizer(ConnectionPoolIdentifier, this.closeConnectionPool)
    this.builder.register(DatabaseIdentifier, this.createDatabase)
  
    this.builder.register(UserRepositoryIdentifier, this.createDBUserRepository)

  }

  private async createConnectionPool(app: Application) {
    const context = await app.get(ApplicationContextIdentifier)
    return new MysqlConnectionPool(context)
  }

  private async closeConnectionPool(pool: ConnectionPool) {
    await pool.closePool()
  }

  private async createDatabase(app: Application) {
    return new MysqlDatabase(await app.get(ConnectionPoolIdentifier))
  }

  private async createDBUserRepository(app: Application) {
    return new DBUserRepository(await app.get(DatabaseIdentifier))
  }

  async create(context: ApplicationContext): Promise<Application> {
    var builder = this.builder.clone()

    builder.put(ApplicationContextIdentifier, context)

    return await builder.build()
  }

}