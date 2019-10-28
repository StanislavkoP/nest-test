import { Controller, Get, Render, UseGuards, Post, Req, UseFilters, Res, Param, Body } from '@nestjs/common';
import { Request, Response, response } from 'express';
import { AuthExceptionFilter } from '../auth/auth.exception';
import { LoginGuard, AuthenticatedGuard } from '../auth/auth.guard';
import {User, UserService} from '../user/user.service'
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRespository } from './admin.respository';
import { AdminService } from './admin.service';
import { createAdminDto } from './admin.dto';
import { Admin } from './admin.entity';
import { AdminAuthExceptionFilter } from './admin.exception';
import { EventService } from '../event/event.service';
import { createAtEventDto } from '../event/event.dto';

@Controller('admin')
export class AdminController {
    constructor(
        private readonly adminService: AdminService,
        private readonly userService: UserService,
        private readonly eventService: EventService
    ) {}

    @Get()
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    @Render('pages/admin/index')
    root(@Res() res: Response, @Req() req: Request) {
        const user = req.user as Admin 

        return {
            user
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

    @Get('users')
    @Render('pages/admin/users')
    usersPage(@Res() res: Response, @Req() req: Request) {
        const users = this.userService.getAllUsers()

        return res.json(users)
    }

    @Get('participants')
    @Render('pages/admin/participants')
    async participantsPage(@Res() res: Response, @Req() req: Request) {
        const participants = await this.eventService.getAllParticipants()
        console.log(participants)
        return {  participants }
    }

    @Get('participants/:id')
    @Render('pages/admin/participant')
    async participantPage(@Res() res: Response, @Param('id') id) {
        const participant = await this.eventService.findOneParticipant(id);

        return { participant }
    }

    @Post('participants/:id')
    @Render('pages/admin/participant')
    async participantPageUpdate(@Res() res: Response, @Param('id') id, @Body() updatedEvent: createAtEventDto) {
        const participant = await this.eventService.updateParticipant(id, updatedEvent);

        if (participant) {
            res.redirect('/admin/participants')
        }
        return res.status(500)
    }
}
