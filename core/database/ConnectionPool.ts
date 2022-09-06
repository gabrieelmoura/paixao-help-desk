import Connection from "./Connection"

export default interface ConnectionPool {
  
  getConnection(): Promise<Connection>
  
  closePool(): Promise<void>

}