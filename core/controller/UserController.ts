
import LoginCommand, { Input as LoginCommandInput } from "../command/LoginCommand"
import Request from "../http/Request"

export default class UserController {

  constructor(
    private loginCommand: LoginCommand
  ) {}

  login(request: Request<LoginCommandInput>) {
    this.loginCommand.run(request.body)
  }

}