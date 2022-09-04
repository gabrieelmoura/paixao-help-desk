import mysql from 'mysql2'
import ApplicationContext from '../application/ApplicationContext'
import Connection from '../../core/database/Connection'
import ConnectionPool from '../../core/database/ConnectionPool'

export default class MysqlConnectionPool implements ConnectionPool {

  mysqlPool: mysql.Pool

  constructor(context: ApplicationContext) {
    this.mysqlPool = mysql.createPool({ ...context.database, namedPlaceholders: true })
  }
  
  getConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.mysqlPool.getConnection((err, connection) => {
        if (err) {
          reject(err)
        } else {
          resolve(connection)
        }
      })
    })
    
  }
  
  closePool(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.mysqlPool.end((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
    
  }

}