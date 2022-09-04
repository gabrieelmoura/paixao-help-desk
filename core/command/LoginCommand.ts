import InvalidCredentialsError from "../error/InvalidCredentialsError"
import UserRepository from "../repository/UserRepository"
import EncryptService from "../security/EncryptService"
import SessionService from "../session/SessionService"

type Input = {
  email: string,
  password: string,
  context: any
}

export default class LoginCommand {

  constructor(
    readonly userRepository: UserRepository,
    readonly encryptService: EncryptService,
    readonly sessionService: SessionService
  ) {}

  async run(input: Input): Promise<void> {
    const user = await this.userRepository.findByEmail(input.email)

    if (!user) {
      throw new InvalidCredentialsError(input.email)
    }

    const passwordValid = this.encryptService.hashCompare(input.password, user.password)

    if (!passwordValid) {
      throw new InvalidCredentialsError(input.email)
    }

    await this.sessionService.startSession(input.context, user)
  }

}

