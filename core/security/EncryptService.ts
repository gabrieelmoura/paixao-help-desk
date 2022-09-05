import { DependencyIdentifier } from "../container/Container"

export const EncryptServiceIdentifier: DependencyIdentifier<EncryptService> = { key: "EncryptService" }

export default interface EncryptService {

  hashPassword(password: string): Promise<string>

  hashCompare(password: string, hash: string): Promise<boolean>

}