import Connection from "./Connection"
import { DependencyIdentifier } from "../container/Container"

export const ConnectionPoolIdentifier: DependencyIdentifier<ConnectionPool> = { key: "ConnectionPool" }

export default interface ConnectionPool {
  
  getConnection(): Promise<Connection>
  
  closePool(): Promise<void>

}