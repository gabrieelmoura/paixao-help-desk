import Connection from "../../core/database/Connection"
import ConnectionPool from "../../core/database/ConnectionPool"
import mysql from "mysql2"
import Database, { InsertResult, QueryParams, QueryResult, SingleQueryResult, UpdateResult } from "../../core/database/Database"

type MysqlResultData = mysql.RowDataPacket[][]
  | mysql.RowDataPacket[]
  | mysql.OkPacket
  | mysql.OkPacket[]
  | mysql.ResultSetHeader

interface MysqlCallbackArgs {
  data: MysqlResultData,
  fields?: mysql.FieldPacket[]
} 

export type Mapper<T> = (line: Record<string, string>) => T

export interface SqlParams {
  sql: string
  params?: any[] | Record<string, any>,
}

export default class MysqlDatabase implements Database {
  
  private currentConnection: Connection | null = null

  constructor(
    readonly pool: ConnectionPool
  ){
  }

  public async queryOne<T>(params: QueryParams<T>): Promise<SingleQueryResult<T>> {
    const { rows, ...result } = await this.query(params)
    return { ...result, row: rows.length ? rows[0] : null }
  }

  public async query<T>(params: QueryParams<T>): Promise<QueryResult<T>> {
    const result = await this.execute(params)
    return {
      rows: (result.data as any[]).map(params.mapper)
    }
  }

  public async update(params: SqlParams): Promise<UpdateResult> {
    const result = await this.execute(params)
    const changedRows = (result.data as mysql.OkPacket).changedRows
    return { changedRows }
  }

  public async insert(params: SqlParams): Promise<InsertResult> {
    const result = await this.execute(params)
    const insertId = (result.data as mysql.OkPacket).insertId
    return { insertId }
  }

  private async execute(params: SqlParams): Promise<MysqlCallbackArgs> {
    const connection = await this.getConnection()
    return new Promise<MysqlCallbackArgs>((resolve, reject) => {
      connection.execute(params.sql, params.params, (error, data, fields) => {
        if (error) {
          reject(error)
          return
        }
        resolve({
          data, fields
        })
      })
    }).finally(() => {
      this.release(connection)
    })
  }

  public async beginTransaction(): Promise<void> {
    const connection = await this.getConnection()
    return new Promise((_, reject) => {
      connection.beginTransaction(err => {
        if (err) {
          reject(err)
        } else {
          this.currentConnection = connection
        }
      })
    })
  }

  public async commit(): Promise<void> {
    const connection = await this.getConnection()
    return new Promise((_, reject) => {
      connection.commit(err => {
        if (err) {
          reject(err)
        } else {
          this.currentConnection = null
        }
      })
    })
  }

  public async rollback(): Promise<void> {
    const connection = await this.getConnection()
    return new Promise(() => {
      connection.rollback(() => {
        this.currentConnection = null
      })
    })
  }

  private async getConnection() {
    if (this.currentConnection) {
      return this.currentConnection
    }
    return await this.pool.getConnection()
  }

  private release(connection: Connection) {
    if (this.currentConnection !== connection) {
      connection.release()
    }
  }

}