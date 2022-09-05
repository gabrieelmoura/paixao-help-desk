import { User } from '../../core/entities';
import TokenService from '../../core/security/TokenService'

export default class RedisTokenService implements TokenService {

  public async generateToken(user: User): Promise<{ accessToken: string; }> {
    throw new Error('Method not implemented.');
  }

}