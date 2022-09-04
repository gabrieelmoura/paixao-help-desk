import { DependencyIdentifier } from "../application/Application"
import { User } from "../entities"

export const UserRepositoryIdentifier: DependencyIdentifier<UserRepository> = { key: "UserRepository" }

export type UserCreationParams = Pick<User, "name" | "email" | "password">

export default interface UserRepository {

  findById(id: number): Promise<User | null>

  findByEmail(email: string): Promise<User | null>

  update(user: User): Promise<void>

  create(user: UserCreationParams): Promise<User>

  deleteById(id: number): Promise<void>

}