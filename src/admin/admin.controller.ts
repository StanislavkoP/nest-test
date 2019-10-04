import { Controller, Get, Render, UseGuards, Post, Req, UseFilters } from '@nestjs/common';
import { Request } from 'express';
import { Roles, AdminRoleGuard } from '../roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthExceptionFilter } from './admin.exception';

@Controller('admin')
@UseGuards(AdminRoleGuard)
@UseFilters(AuthExceptionFilter)
export class AdminController {

    @Get()
    @Render('pages/admin')
    @Roles('admin')
    root() {
        return {}
    }

    @Get('login')
    @Render('pages/admin/login')
    loginPage() {
        return {}
    }

    @Post('login')
    @UseGuards(AuthGuard('local'))
    login(@Req() req: Request) {
        console.log(req.body)
        return req.body
    }
}
