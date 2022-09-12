export interface User {
  
  id: number

  name: string
  email: string
  password: string

  created_at: Date
  updated_at: Date
  deleted_at: Date | null

}

export interface Session {

  id: string

  userId: number
  userAgent: string

  createdAt: Date
  expiresAt: Date | null

}

export interface Unit {

  id: number

  name: string

  created_at: Date
  updated_at: Date
  deleted_at: Date | null

}

export interface ServiceCallTag {

  id: number

  name: string

  created_at: Date
  updated_at: Date
  deleted_at: Date | null

}

export interface ServiceCall {

  id: number

  unit_id: number
  creator_id: number
  responsible_id: number
  status_id: number
  title: string
  description: string
  order: number

  created_at: Date
  updated_at: Date
  deleted_at: Date | null

}

export interface ServiceCallHistory {

  id: number

  unit_id: number
  responsible_id: number
  status_id: number

  created_at: Date

}

export interface ServiceCallComment {

  id: number

  content: string
  creator_id: string
  call_id: string
  
  created_at: Date
  updated_at: Date
  deleted_at: Date | null

}