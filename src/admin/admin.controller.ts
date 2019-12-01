import { Controller, Get, Render, UseGuards, Post, Req, UseFilters, Res, Param, Body, Delete } from '@nestjs/common';
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
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async adminList(@Res() res: Response, @Req() req: Request) {
        const user = req.user as Admin;
        const admins = await this.adminService.findAll(user.id);

        return { admins, user }
    }

    @Get('users/user/:userId')
    @Render('pages/admin/user')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async editUserPage(@Res() res: Response, @Req() req: Request, @Param('userId') userId) {
        const user = req.user as Admin;
        const admin = await this.adminService.findOne(userId);

        if(!admin) {
            return res.status(404).json({error: "User not found"})
        }
        return { admin, user }
    }

    @Post('users/user/:userId')
    @Render('pages/admin/user')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async editUser(@Res() res: Response, @Req() req: Request, @Param('userId') userId, @Body() userData: createAdminDto) {
        const user = req.user as Admin;
        const updatedAdmin = await this.adminService.updateUser(userId, userData);
        console.log(updatedAdmin)
        if(updatedAdmin.affected > 0) {
            return { admin: userData, user }
        } else {
            return res.status(404).json({error: "User not found"})
        }
        
    }

    @Post('users/user/:userId/delete')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async deleteUser(@Res() res: Response, @Req() req: Request, @Param('userId') userId) {
        const deletedUser = await this.adminService.deleteUser(userId);

        if(deletedUser.affected > 0) {
            return res.redirect('/admin/users');
        } else {
            return res.status(404).json({error: "User not found"})
        }
        
    }

    @Post('users/user/:userId/recovery')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async recoveryUser(@Res() res: Response, @Req() req: Request, @Param('userId') userId) {
        const updatedAdmin = await this.adminService.updateUser(userId, { deleted: false });

        if(updatedAdmin.affected > 0) {
            return res.redirect('/admin/users');
        } else {
            return res.status(404).json({error: "User not found"})
        }
        
    }


    @Get('users/new')
    @Render('pages/admin/user')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    createUserPage(@Res() res: Response, @Req() req: Request) {
        return {}
    }

    @Post('users/new')
    @Render('pages/admin/user')
    @UseGuards(AuthenticatedGuard)
    @UseFilters(AdminAuthExceptionFilter)
    async createUser(@Res() res: Response, @Req() req: Request, @Body() userData: createAdminDto) {
        const createdUser =  await this.adminService.createUser(userData);
        console.log(createdUser)
        return { admin: createdUser }
    }

    @Get('participants')
    @Render('pages/admin/participants')
    async participantsPage(@Res() res: Response, @Req() req: Request) {
        const participants = await this.eventService.getAllParticipants()
        const user = req.user as Admin;

        return {  participants, user }
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
