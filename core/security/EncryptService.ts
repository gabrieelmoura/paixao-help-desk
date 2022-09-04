
export default interface EncryptService {

  hashPassword(password: string): Promise<string>

  hashCompare(password: string, hash: string): Promise<boolean>

}