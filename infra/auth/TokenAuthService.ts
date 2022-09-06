import { RedisClientType as RedisClient } from 'redis'
import { User } from '../../core/entities';
import AuthService from '../../core/auth/AuthService'

function randomString(length: number) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*(){}[]/-+.,:;'
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export default class TokenAuthService implements AuthService {

  constructor(
    private redis: RedisClient
  ) {}

  async login(user: User): Promise<void> {

    const accessToken = randomString(32)

    const key = `tokens:${ accessToken }`
    const value = user.id

    await this.redis.set(key, value)
    
  }
  
  user(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }

}