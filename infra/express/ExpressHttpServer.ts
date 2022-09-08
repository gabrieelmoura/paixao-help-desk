import HttpServer, { RequestHandler } from "../../core/http/HttpServer"
import HttpMessageConverter from "./HttpMessageConverter"

import express, { Express } from "express"
import bodyParser from "body-parser"

export default class ExpressHttpServer implements HttpServer {
  
  express: Express;
  converter: HttpMessageConverter = new HttpMessageConverter()

  constructor() {
    this.express = express()
  }

  listen(port: number): void {
    this.express.listen(port, () => {
      console.log("Server statup at port " + port)
    })
  }

  get(path: string, handler: RequestHandler<any, any>): void {
    this.express.get(path, this.converter.asExpressHandler(handler))
  }

  post(path: string, handler: RequestHandler<any, any>): void {
    this.express.post(path, this.converter.asExpressHandler(handler))
  }

  put(path: string, handler: RequestHandler<any, any>): void {
    this.express.put(path, this.converter.asExpressHandler(handler))
  }

  delete(path: string, handler: RequestHandler<any, any>): void {
    this.express.delete(path, this.converter.asExpressHandler(handler))
  }

}