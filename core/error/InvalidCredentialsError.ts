import ApplicationError from "./ApplicationError";

export default class InvalidCredentialsError extends ApplicationError {

  constructor(
    readonly email: string
  ) {

    const userMessage = {
      label: 'USER_NOT_FOUND',
      arguments: [ email ]
    }

    const logMessage = `Invalid login attempt for user ${ email }`

    super(logMessage, userMessage, null, 404)

    Object.setPrototypeOf(this, InvalidCredentialsError.prototype)

  }

}