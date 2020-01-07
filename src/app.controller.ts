import { Controller, Get, Post, Res, HttpStatus, Param, UseInterceptors, Render, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './auth/auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
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
