import { DependencyIdentifier } from "../application/Application"

export type Mapper<T> = (line: Record<string, string>) => T

export interface SqlParams {
  sql: string
  params?: any[] | Record<string, any>,
}

export interface QueryParams<T> extends SqlParams {
  mapper: Mapper<T>
}

export interface SingleQueryResult<T> {
  row: T | null
}

export interface QueryResult<T> {
  rows: T[]
}

export interface UpdateResult {
  changedRows: number
}

export interface InsertResult {
  insertId: number
}

export const DatabaseIdentifier: DependencyIdentifier<Database> = { key: "Database" }

export default interface Database {
  
  queryOne<T>(params: QueryParams<T>): Promise<SingleQueryResult<T>>

  query<T>(params: QueryParams<T>): Promise<QueryResult<T>>

  update(params: SqlParams): Promise<UpdateResult>

  insert(params: SqlParams): Promise<InsertResult>

  beginTransaction(): Promise<void>

  commit(): Promise<void>

  rollback(): Promise<void>

}