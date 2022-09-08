import Request from "./Request"
import Response from "./Response"

export type RequestHandler<Body, Result> = (req: Request<Body>, res: Response<Result>) => void

export default interface HttpServer {

  get(path: string, handler: RequestHandler<any, any>): void

  post(path: string, handler: RequestHandler<any, any>): void

  put(path: string, handler: RequestHandler<any, any>): void

  delete(path: string, handler: RequestHandler<any, any>): void

  listen(port: number): void

}