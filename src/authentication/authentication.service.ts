import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PayloadJWT } from 'src/common/interfaces/payload-jwt.interface';
import { UserModel } from 'src/models/user.model';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  public async login(user: UserModel) {
    const { user_id: sub, email } = user;
    const payload: PayloadJWT = { sub, email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async validateUserEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const result = await this.findUser(email);

    if (result && (await compare(password, result?.password))) {
      return result;
    }

    return null;
  }

  public async findUser(email: string): Promise<UserModel | null> {
    try {
      const user = await this.userRepository.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      this.logger.error('An error occured finding the user');
      return null;
    }
  }
}
