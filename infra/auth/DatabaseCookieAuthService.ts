import { User } from '../../core/entities'
import AuthService from '../../core/auth/AuthService'
import DBSessionRepository from '../repository/DBSessionRepository'
import UserRepository from '../../core/repository/UserRepository'
import RequestContext from '../context/RequestContext'

function randomString(length: number) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*(){}[]/-+.,:;'
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export default class DatabaseCookieAuthService implements AuthService {

  private currentUser: User | null = null

  constructor(
    private sessionRepository: DBSessionRepository,
    private userRepository: UserRepository,
    private requestContext: RequestContext
  ) {}

  async login(user: User, options: { persistent: boolean }): Promise<void> {

    const id = randomString(64)

    await this.sessionRepository.create({
      id, 
      userId: user.id, 
      userAgent: this.requestContext.request.headers["User-Agent"],
      expiresAt:  new Date(new Date().getTime() + 600000)
    })

    const cookieArgs: string[] = [ "HttpOnly" ]

    if (options.persistent) {
      cookieArgs.push("Max-Age: 31536000")
    }

    this.requestContext.response.header("Set-Cookie", `session=${ id }; ${ cookieArgs.join("; ") }`)
    
  }
  
  async user(): Promise<User | null> {
    
    if (this.currentUser) return this.currentUser

    const id = this.requestContext.request.cookies.session

    if (!id) return null

    const session = await this.sessionRepository.findActiveById(id)

    if (!session) return null

    await this.sessionRepository.delayExpiration(id)

    const currentUser = await this.userRepository.findById(session.userId)

    return this.currentUser = currentUser

  }
  
  async logout(): Promise<void> {
    
    const id = this.requestContext.request.cookies.session

    if (!id) return

    const cookieArgs: string[] = [ "HttpOnly", "Max-Age=0" ]

    this.requestContext.response.header("Set-Cookie", `session=; ${ cookieArgs.join("; ") }`)

    await this.sessionRepository.deleteById(id)

  }

}