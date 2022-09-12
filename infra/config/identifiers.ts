import { DependencyIdentifier } from "../../commons/container/Container"

import { RedisClientType as RedisClient } from 'redis'

import ConnectionPool from "../../core/database/ConnectionPool"
import Database from "../../core/database/Database"

import UserRepository from "../../core/repository/UserRepository"

import AuthService from "../../core/auth/AuthService"
import EncryptService from "../../core/security/EncryptService"

import HttpServer from "../../core/http/HttpServer"
import Router from "../../core/http/Router"

import UserController from "../../core/controller/UserController"

import ApplicationContext from "../context/ApplicationContext"
import RequestContext from "../context/RequestContext"
import IndexController from "../../core/controller/IndexController"

import LoginCommand from "../../core/command/LoginCommand"

export const RedisClientIdenfifier: DependencyIdentifier<RedisClient> = { key: "RedisClient" }

export const ConnectionPoolIdentifier: DependencyIdentifier<ConnectionPool> = { key: "ConnectionPool" }
export const DatabaseIdentifier: DependencyIdentifier<Database> = { key: "Database" }

export const UserRepositoryIdentifier: DependencyIdentifier<UserRepository> = { key: "UserRepository" }

export const AuthServiceIdentifier: DependencyIdentifier<AuthService> = { key: "AuthService" }
export const EncryptServiceIdentifier: DependencyIdentifier<EncryptService> = { key: "EncryptService" }

export const HttpServerIdentifier: DependencyIdentifier<HttpServer> = { key: "HttpServer" }
export const RouterIdentifier: DependencyIdentifier<Router> = { key: "Router" }

export const UserControllerIdentifier: DependencyIdentifier<UserController> = { key: "UserController" }
export const IndexControllerIdentifier: DependencyIdentifier<IndexController> = { key: "IndexController" }

export const ApplicationContextIdentifier: DependencyIdentifier<ApplicationContext> = { key: "Context" }
export const RequestContextIdentifier: DependencyIdentifier<RequestContext> = { key: "RequestContext" }

export const LoginCommandIdentifier: DependencyIdentifier<LoginCommand> = { key: "LoginCommand" }