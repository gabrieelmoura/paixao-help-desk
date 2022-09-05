import ContainerBuilder from "../../core/container/ContainerBuilder"
import { UserRepositoryIdentifier } from "../../core/repository/UserRepository"
import Container from "../../core/container/Container"
import DBUserRepository from "../repository/DBUserRepository"
import { DatabaseIdentifier } from "../../core/database/Database"
import { ConnectionPoolIdentifier } from "../../core/database/ConnectionPool"
import MysqlDatabase from "../mysql/MysqlDatabase"

async function createDatabase(app: Container) {
  return new MysqlDatabase(await app.get(ConnectionPoolIdentifier))
}

async function createDBUserRepository(app: Container) {
  return new DBUserRepository(await app.get(DatabaseIdentifier))
}

export default function makeRequestContainer(parent: Container) {

  const builder = new ContainerBuilder(parent)
  
  builder.register(DatabaseIdentifier, createDatabase)

  builder.register(UserRepositoryIdentifier, createDBUserRepository)

  return builder.build()

}