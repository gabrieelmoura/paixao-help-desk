import { RequestHandler } from "../../core/http/HttpServer"
import Request from "../../core/http/Request"
import Response from "../../core/http/Response"

import { Request as ExpressRequest, Response as ExpressResponse } from "express"

export default class HttpMessageConverter {

  convertRequest(request: ExpressRequest): Request<any> {
    return {
      body: request.body
    }
  }
  
  convertResponse(respose: ExpressResponse): Response<any> {
    return {
      status(code) {
        respose.status(code)
        return this
      },
      send(body) {
        respose.send(body)
        return this
      }
    }
  }

  asExpressHandler(handler: RequestHandler<any, any>) {
    return async (request: ExpressRequest, response: ExpressResponse) => {
      await handler(this.convertRequest(request), this.convertResponse(response))
    }
  }

}