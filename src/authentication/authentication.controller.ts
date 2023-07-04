import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';

@Controller('api/auth')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() req: Request) {
    return this.service.login(req.user);
  }
}
