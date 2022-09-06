import { User } from "../entities"

export type UserCreationParams = Pick<User, "name" | "email" | "password">

export default interface UserRepository {

  findById(id: number): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  update(user: User): Promise<void>

  create(user: UserCreationParams): Promise<User>

  deleteById(id: number): Promise<void>

}