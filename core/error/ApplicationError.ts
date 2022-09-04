
type MessageInterpolation = { label: string, arguments: string[] }

export default class ApplicationError extends Error {

  constructor(
    message: string,
    readonly userMessage: MessageInterpolation,
    readonly userDescription: MessageInterpolation | null,
    readonly status: number
  ) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype)
  }

}