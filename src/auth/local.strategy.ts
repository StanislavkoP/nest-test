import { Injectable, UnauthorizedException, HttpException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { User } from "../user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
          });
    }

    async validate(email, password): Promise<User | undefined> {
        const user : User = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException("This user doesn't exist");
        }

        return user;
    }
}