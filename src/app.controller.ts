import { Controller, Get, Param, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) {}


  @Get(':url')
  @Redirect()
  async getHello(
    @Param('url') url: string
  ) {
    const originalUrl =  await this.appService.redirect(url);
    return {
      "url": originalUrl,
      "statusCode": 301
    }
  }
}
