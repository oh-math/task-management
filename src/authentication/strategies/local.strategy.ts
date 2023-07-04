import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserModel } from 'src/models/user.model';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<UserModel> {
    const userValidated = await this.service.validateUserEmailAndPassword(email, password);

    if (!userValidated) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'E-mail and/or password invalid',
      });
    }

    return userValidated;
  }
}
