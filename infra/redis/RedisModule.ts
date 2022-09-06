import { createClient, RedisClientType as RedisClient } from 'redis'
import { ApplicationContextIdentifier, RedisClientIdenfifier } from '../config/identifiers'
import Container from '../../commons/container/Container'
import ContainerBuilder from "../../commons/container/ContainerBuilder"
import Module from "../../commons/container/Module"
import Scope from '../../commons/container/Scope'

export default class RedisModule implements Module {

  register(builder: ContainerBuilder, context: { scope: Scope }): void {
    
    if (context.scope !== "SINGLETON") return

    builder.register(RedisClientIdenfifier, this.createRedisClient)
    builder.registerFinalizer(RedisClientIdenfifier, this.closeRedis)

  }

  async createRedisClient(app: Container): Promise<RedisClient> {

    const context = await app.get(ApplicationContextIdentifier)
    const client: RedisClient = createClient({ url: context.redis.url })

    await client.connect()
   
    return client

  }
  
  async closeRedis(redis: RedisClient) {
    await redis.disconnect()
  }

}