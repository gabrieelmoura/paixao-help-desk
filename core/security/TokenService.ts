import { User } from "../entities"

export default interface TokenService {

  generateToken(user: User): Promise<{
    accessToken: string
  }>

}