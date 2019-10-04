import { Controller, Get, Post, Res, HttpStatus, Param, UseInterceptors, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root () {
    return {
      message: 'Hello'
    }
  }

  @Get('/person/registration/:id')
  registerNewPerson(@Param('id') id): string {
    return `Our ${JSON.stringify(id)}`;
  }

  @Get('/new')
  getHello(): string {
    return this.appService.getHello();
  }
}
