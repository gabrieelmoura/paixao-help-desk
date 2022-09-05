import { createClient, RedisClientType as RedisClient } from 'redis'
import { DependencyIdentifier } from '../../core/container/Container'
import ApplicationContext from '../container/ApplicationContext'

export const RedisClientIdenfifier: DependencyIdentifier<RedisClient> = { key: "RedisClient" }

export default async function (context: ApplicationContext): Promise<RedisClient> {
  const client: RedisClient = createClient({ url: context.redis.url })

  await client.connect()
 
  return client
}