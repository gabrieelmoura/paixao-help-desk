import { User } from "../entities"

export default interface AuthService {
  
  login(user: User): Promise<void>

  user(): Promise<User>

  logout(): Promise<void>

}