
export type EnvType = "DEV" | "TEST" | "PROD"

export default interface ApplicationContext {

  env: EnvType,

  redis: {
    url: string
  }

  database: {
    user: string,
    password: string,
    host: string,
    port: number,
    database: string
  }

}