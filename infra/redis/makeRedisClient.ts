import { createClient, RedisClientType as RedisClient } from 'redis'
import ApplicationContext from '../container/ApplicationContext'

export default async function (context: ApplicationContext): Promise<RedisClient> {
  const client: RedisClient = createClient({ url: context.redis.url })

  // await client.connect()
 
  return client
}