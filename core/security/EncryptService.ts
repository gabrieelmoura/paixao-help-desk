
export default interface EncryptService {

  hashPassword(password: string): Promise<void>

  hashCompare(password: string, hash: string): Promise<boolean>

}