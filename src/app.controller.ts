import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // controller로서의 역할을 수행하겠다 - nest.js 에게 말함.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // HTTP Get 으로 요청을 받는것
  getHello(): string {
    return this.appService.getHello();
  }
}
