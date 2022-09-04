import { User } from "../../core/entities"
import UserRepository, { UserCreationParams } from "../../core/repository/UserRepository"
import Database from "../../core/database/Database"

export default class DBUserRepository implements UserRepository {

  private static SELECT = "SELECT * FROM PHD_USER"

  constructor(
    readonly database: Database
  ) {}

  public async findById(id: number): Promise<User | null> {
    const result = await this.database.queryOne({
      sql: DBUserRepository.SELECT + " WHERE `id` = ?",
      params: [ id ],
      mapper: this.mapUser
    })
    return result.row
  }

  public async findByEmail(email: string): Promise<User | null> {
    const result = await this.database.queryOne({
      sql: DBUserRepository.SELECT + " WHERE email = ?",
      params: [ email ],
      mapper: this.mapUser
    })
    return result.row
  }

  public async create(params: UserCreationParams): Promise<User> {
    const { insertId } = await this.database.insert({
      sql: "INSERT INTO PHD_USER(`name`, `email`, `password`) VALUES (:name, :email, :password)", params
    })
    const user = await this.findById(insertId)
    if (!user) throw new Error()
    return user
  }

  public async update(user: User): Promise<void> {
    await this.database.update({
      sql: "UPDATE PHD_USER SET `name` = :name, `email` = :email, `password` = :password WHERE `id` = :id",
      params: user
    })
  }

  public async deleteById(id: number): Promise<void> {
    await this.database.update({
      sql: "DELETE FROM PHD_USER WHERE `id` = ?",
      params: [ id ]
    })
  }

  private mapUser(row: any): User {
    return { ...row }
  }

}