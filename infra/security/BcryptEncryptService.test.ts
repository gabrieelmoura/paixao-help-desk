import BcryptEncryptService from "./BcryptEncryptService"

describe("BCryptEncryptService", () => {

  it("Should encrypt and verify passwords", async () => {

    const password = "^ofvCS1zd*4!pK9Nz7!PwX"
    const service = new BcryptEncryptService()

    const hash = await service.hashPassword(password)
    const compare = await service.hashCompare(password, hash)

    expect(compare).toBeTruthy()

  })

  it("Should verify wrong passwords", async () => {

    const password = "^ofvCS1zd*4!pK9Nz7!PwX"
    const service = new BcryptEncryptService()

    const hash = await service.hashPassword(password)
    const compare = await service.hashCompare(password + ":)", hash)

    expect(compare).toBeFalsy()

  })

})