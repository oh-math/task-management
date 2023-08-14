import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { UserModelRequest } from '@common/interfaces';
import { LocalAuthGuard } from 'src/common/guards';

@Controller('api/auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: UserModelRequest) {
    return this.service.generateToken(req.user);
  }
}
