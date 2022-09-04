import EncryptService from "../../core/security/EncryptService"
import bcrypt from "bcrypt"

export default class BcryptEncryptService implements EncryptService {

  private saltRounds: number = 10

  public async hashPassword(password: string): Promise<string> {
    const salt = await this.bcryptGenSalt()
    const hash = await this.bcryptHash(salt, password)
    return hash
  }

  public async hashCompare(password: string, hash: string): Promise<boolean> {
    return await this.bcryptCompare(password, hash)
  }

  private bcryptCompare(plainText: string, hash: string) {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(plainText, hash, (err, result) => err ? reject(err) : resolve(result))
    })
  }

  private bcryptHash(salt: string, plainText: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(plainText, salt, (err, hash) => err ? reject(err) : resolve(hash))
    })
  }

  private bcryptGenSalt(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(this.saltRounds, (err, salt) => err ? reject(err) : resolve(salt))
    })
  }

}