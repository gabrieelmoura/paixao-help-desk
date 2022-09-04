import Application from "../../core/application/Application"
import Database, { DatabaseIdentifier } from "../../core/database/Database"
import DBUserRepository from "./DBUserRepository"

declare global {
  var app: Application
}

describe("DBUserRepository", () => {

  var database: Database
  var repository: DBUserRepository

  beforeAll(async () => {

    database = await app.get(DatabaseIdentifier)
    repository = new DBUserRepository(database)

  })

  it("should find users by id", async () => {
  
    const expectedUser = await repository.create({
      name: "Name", email: "email@gmail.com", password: "123"
    })

    const actualUser = await repository.findById(expectedUser.id)
  
    expect(actualUser?.id).toBe(expectedUser.id)
        
  })

  it("should find users by e-mail", async () => {
  
    const expectedUser = await repository.create({
      name: "Name", email: "expected@gmail.com", password: "123"
    })

    const actualUser = await repository.findByEmail(expectedUser.email)
  
    expect(actualUser?.email).toBe(expectedUser.email)
        
  })

  it("should update users", async () => {
  
    const actualUser = await repository.create({
      name: "Name", email: "email@gmail.com", password: "123"
    })

    actualUser.name = "Other Name"
    actualUser.email = "otheremail@gmail.com"
    actualUser.password = "otherpassword"

    await repository.update(actualUser)

    const expectedUser = await repository.findById(actualUser.id);
  
    const fields = [ "name", "email", "password", "id" ]

    fields.forEach(field => {
      expect((expectedUser as any)[field]).toBe((actualUser as any)[field])
    })
    expect(expectedUser?.updated_at).not.toBe(actualUser.updated_at)

  })

  it("should delete users", async () => {
  
    const actualUser = await repository.create({
      name: "Name", email: "email@gmail.com", password: "123"
    })

    await repository.deleteById(actualUser.id)
    const expectedUser = await repository.findById(actualUser.id)
  
    expect(expectedUser).toBeNull()
        
  })

  it("should return null when user doesn't exist", async () => {
  
    const user = await repository.findByEmail("wrong@gmail.com")
  
    expect(user).toBeNull()
        
  })
      
})
