import { RedisClientType as RedisClient } from 'redis'
import { RedisClientIdenfifier } from '../config/identifiers'
import Container from '../../commons/container/Container'

declare global {
  var app: Container
}

describe("RedisClient", () => {

  let redis: RedisClient

  beforeAll(async () => {
    redis = await app.get(RedisClientIdenfifier)
  })

  it("Redis Client is alive", async () => {

    await redis.set("teste", "2022")
    const value = await redis.get("teste")

    expect(value).toBe("2022")
    
  })

})