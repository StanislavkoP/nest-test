import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(username, password): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}