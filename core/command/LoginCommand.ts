import InvalidCredentialsError from "../error/InvalidCredentialsError"
import UserRepository from "../repository/UserRepository"
import EncryptService from "../security/EncryptService"
import AuthService from "../auth/AuthService"
import Command from "./Command"

export type Input = {
  email: string,
  password: string,
  context: any
}

export default class LoginCommand implements Command<Input, void> {

  constructor(
    private userRepository: UserRepository,
    private encryptService: EncryptService,
    private authService: AuthService
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

    await this.authService.login(user)
  }

}

