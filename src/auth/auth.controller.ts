import { Get, Controller, Render, Post, UseGuards, Res, Req } from "@nestjs/common";
import { Request, Response } from 'express';
import { LoginGuard } from "./login.guard";

@Controller('/login')
export class AuthController {

    @Get()
    @Render('pages/admin/login')
    loginPage() {
        return {}
    }

    @Post()
    @UseGuards(LoginGuard)
    login(@Res() res: Response, @Req() req: Request) {
        res.redirect('/admin')
    }
}