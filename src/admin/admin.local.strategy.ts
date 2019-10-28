import { Injectable, UnauthorizedException, HttpException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AdminService } from "./admin.service";
import { Admin } from "./admin.entity";

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly adminService: AdminService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
          });
    }

    async validate(email, password): Promise<Admin | undefined> {
        const user: Admin = await this.adminService.logIn({ email, password });
        if (!user) {
            throw new UnauthorizedException("This user doesn't exist");
        }

        return user;
    }
}