import Request from "../../core/http/Request"
import Response from "../../core/http/Response"

export default interface RequestContext {
  request: Request<any>
  response: Response<any>
}