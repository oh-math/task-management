import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthenticationService } from './authentication.service';
import { UserModelRequest } from 'src/common/interfaces';

@Controller('api/auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: UserModelRequest) {
    return this.service.login(req.user);
  }
}
