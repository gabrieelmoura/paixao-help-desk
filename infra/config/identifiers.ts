import { DependencyIdentifier } from "../../commons/container/Container"

import { RedisClientType as RedisClient } from 'redis'

import ConnectionPool from "../../core/database/ConnectionPool"
import Database from "../../core/database/Database"

import UserRepository from "../../core/repository/UserRepository"

import EncryptService from "../../core/security/EncryptService"

import ApplicationContext from "../context/ApplicationContext"
import RequestContext from "../context/RequestContext"

export const RedisClientIdenfifier: DependencyIdentifier<RedisClient> = { key: "RedisClient" }

export const ConnectionPoolIdentifier: DependencyIdentifier<ConnectionPool> = { key: "ConnectionPool" }
export const DatabaseIdentifier: DependencyIdentifier<Database> = { key: "Database" }

export const UserRepositoryIdentifier: DependencyIdentifier<UserRepository> = { key: "UserRepository" }

export const EncryptServiceIdentifier: DependencyIdentifier<EncryptService> = { key: "EncryptService" }

export const ApplicationContextIdentifier: DependencyIdentifier<ApplicationContext> = { key: "Context" }
export const RequestContextIdentifier: DependencyIdentifier<RequestContext> = { key: "RequestContext" }