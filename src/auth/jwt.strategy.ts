import { Injectable, UnauthorizedException, HttpException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { User } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username, password): Promise<User | undefined> {
        const user : User = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException("This user doesn't exist");
        }

        return user;
    }
}