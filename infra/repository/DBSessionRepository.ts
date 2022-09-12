import Database from "../../core/database/Database";
import { Session } from "../../core/entities";

export type SessionCreateParams = Omit<Session, "createdAt">

export default class DBSessionRepository {

  constructor(
    private database: Database
  ) {}

  async findActiveById(id: string): Promise<Session | null> {
    const result = await this.database.queryOne({
      sql: " SELECT * FROM PHP_SESSION WHERE `id` = ?",
      params: [ id ],
      mapper: this.mapSession
    })
    return result.row
  }

  delayExpiration(id: string): Promise<void> {
    return null as any
  }

  create(session: SessionCreateParams): Promise<void> {
    return null as any
  }

  deleteById(id: string): Promise<void> {
    return null as any
  }

  private mapSession(row: any): Session {
    return { 
      id: row.id,
      createdAt: row.created_at, 
      expiresAt: row.expires_at,
      userId: row.user_id,
      userAgent: row.user_agent
    }
  }

}