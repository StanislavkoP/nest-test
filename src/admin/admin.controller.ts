import { Controller, Get, Render, UseGuards, Post, Req, UseFilters, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthExceptionFilter } from '../auth/auth.exception';
import { LoginGuard, AuthenticatedGuard } from '../auth/auth.guard';
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
    loginPage(@Req() req: Request) {
        return {
            message: req.flash('loginError')
        }
    }

    @Post('login')
    @UseFilters(AuthExceptionFilter)
    @UseGuards(LoginGuard)
    async login(@Res() res: Response, @Req() req: Request) {
        return res.redirect('/admin')
    }
}
