import { DependencyIdentifier } from "../../core/container/Container"

export const ApplicationContextIdentifier: DependencyIdentifier<ApplicationContext> = { key: "Context" }

export type EnvType = "DEV" | "TEST" | "PROD"

export default interface ApplicationContext {

  env: EnvType,

  database: {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string
  }

}