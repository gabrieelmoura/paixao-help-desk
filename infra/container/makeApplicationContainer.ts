import ContainerBuilder from "../../core/container/ContainerBuilder"
import Container from "../../core/container/Container"
import { RedisClientType as RedisClient } from 'redis'
import ApplicationContext, { ApplicationContextIdentifier } from "./ApplicationContext"
import ConnectionPool, { ConnectionPoolIdentifier } from "../../core/database/ConnectionPool"
import MysqlConnectionPool from "../mysql/MysqlConnectionPool"
import { EncryptServiceIdentifier } from "../../core/security/EncryptService"
import BcryptEncryptService from "../security/BcryptEncryptService"
import makeRedisClient, { RedisClientIdenfifier } from "../redis/makeRedisClient"

async function createConnectionPool(app: Container) {
  const context = await app.get(ApplicationContextIdentifier)
  return new MysqlConnectionPool(context)
}

async function createRedisClient(app: Container) {
  const context = await app.get(ApplicationContextIdentifier)
  return await makeRedisClient(context)
}

async function closeConnectionPool(pool: ConnectionPool) {
  await pool.closePool()
}

async function closeRedis(redis: RedisClient) {
  await redis.disconnect()
}

export default function makeApplicationContainer(context: ApplicationContext) {

  const builder = new ContainerBuilder()
  
  builder.register(ConnectionPoolIdentifier, createConnectionPool)
  builder.registerFinalizer(ConnectionPoolIdentifier, closeConnectionPool)
  
  builder.put(EncryptServiceIdentifier, new BcryptEncryptService())

  builder.register(RedisClientIdenfifier, createRedisClient)
  builder.registerFinalizer(RedisClientIdenfifier, closeRedis)

  builder.put(ApplicationContextIdentifier, context)

  return builder.build()

}