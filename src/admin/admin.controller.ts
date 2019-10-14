import { Controller, Get, Render, UseGuards, Post, Req, UseFilters, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles, AdminRoleGuard } from '../roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { AuthExceptionFilter } from './admin.exception';
import { LoginGuard, AuthenticatedGuard } from '../auth/login.guard';
import {User} from '../user/user.service'

@Controller('admin')
@UseFilters(AuthExceptionFilter)
export class AdminController {
    @Get()
    @UseGuards(AuthenticatedGuard)
    @Render('pages/admin')
    root(@Res() res: Response, @Req() req: Request) {
        const user = req.user as User 

        return {
            user: req.user
        }
    }

    @Get('login')
    @Render('pages/admin/login')
    loginPage() {
        return {}
    }

    @Post('login')
    @UseGuards(LoginGuard)
    async login(@Res() res: Response, @Req() req: Request) {
        res.redirect('/admin')
    }
}
