import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  @HttpCode(HttpStatus.OK)
  public checkApi() {
    return {
      message: 'API is running just fine',
      status: HttpStatus.OK,
    };
  }
}
