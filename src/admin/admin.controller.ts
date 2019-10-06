import { Controller, Get, Render, UseGuards, Post, Req, UseFilters, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Roles, AdminRoleGuard } from '../roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { AuthExceptionFilter } from './admin.exception';

@Controller('admin')
@UseFilters(AuthExceptionFilter)
export class AdminController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    @Render('pages/admin')
    root(@Req() req: Request) {
        return {}
    }

    @Get('login')
    @Render('pages/admin/login')
    loginPage() {
        return {}
    }

    @Post('login')
    async login(@Res() res: Response, @Req() req: Request) {
        const user = await this.authService.validateUser(req.body.login , req.body.password);

        if (user) {
            const authUser = await this.authService.login({username: user.username, userId: user.userId, password: req.body.password})
            
            return res.json({
                ...user,
                ...authUser
            });
        }
    }
}
