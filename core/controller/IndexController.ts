import Request from "../http/Request"
import Response from "../http/Response"

export default class IndexController {

  constructor() {}

  ok(_: Request<void>, res: Response<string>) {
    res.send("Ok")
  }

}