import { User } from "../entities"

export default interface SessionService {
  
  startSession(context: any, user: User): Promise<void>

  closeSession(context: any, user: User): Promise<void>

}