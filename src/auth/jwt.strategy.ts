import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from "./auth.service";
import { ExtractJwt } from "passport-jwt";
import { jwtConstants } from "./constants";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpire: false,
            secretOrKey:  jwtConstants.secretKey
        });

    }

    async validate(payload): Promise<any> {
        const user = await this.authService.validateUser(payload.username, payload.password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}