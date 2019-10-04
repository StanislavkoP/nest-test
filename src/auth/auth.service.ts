import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UserService) {}

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
