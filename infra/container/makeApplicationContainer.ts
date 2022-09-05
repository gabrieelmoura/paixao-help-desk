import ContainerBuilder from "../../core/container/ContainerBuilder"
import Container from "../../core/container/Container"
import ApplicationContext, { ApplicationContextIdentifier } from "./ApplicationContext"
import ConnectionPool, { ConnectionPoolIdentifier } from "../../core/database/ConnectionPool"
import MysqlConnectionPool from "../mysql/MysqlConnectionPool"
import { EncryptServiceIdentifier } from "../../core/security/EncryptService"
import BcryptEncryptService from "../security/BcryptEncryptService"

async function createConnectionPool(app: Container) {
  const context = await app.get(ApplicationContextIdentifier)
  return new MysqlConnectionPool(context)
}


async function closeConnectionPool(pool: ConnectionPool) {
  await pool.closePool()
}

export default function makeApplicationContainer(context: ApplicationContext) {

  const builder = new ContainerBuilder()
  
  builder.register(ConnectionPoolIdentifier, createConnectionPool)
  builder.registerFinalizer(ConnectionPoolIdentifier, closeConnectionPool)
  
  builder.put(EncryptServiceIdentifier, new BcryptEncryptService())

  builder.put(ApplicationContextIdentifier, context)

  return builder.build()

}