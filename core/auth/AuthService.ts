import { User } from "../entities"

export default interface AuthService {
  
  login(user: User, options: { persistent: boolean }): Promise<void>

  user(): Promise<User | null>

  logout(): Promise<void>

}