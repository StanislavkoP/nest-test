import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthLoginDto } from './auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService
    ) {}

    validatePayload(payload) {
        const login = plainToClass(AuthLoginDto, payload);     
        
        validate(login).then(errors => {
            console.log(errors)
        })
    }

    async validateUser(userName: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(userName);
        if (user && user.password === pass) {
            const {
                password,
                ...result
            } = user;

            return result;
        }
        return null
    }

}
