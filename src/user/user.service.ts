import { Injectable } from '@nestjs/common';

export type User = {
  userId: Number,
  username: String,
  password: String,
  role: String,
};

@Injectable()
export class UserService {
    private readonly users: User[];
    
    constructor() {
        this.users = [
          {
            userId: 1,
            username: 'admin',
            password: 'admin',
            role: 'admin',
          },
          {
            userId: 2,
            username: 'super',
            password: 'super',
            role: 'superadmin',
          },
          {
            userId: 3,
            username: 'maria',
            password: 'guess',
            role: 'superadmin'
          },
        ];
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username)
    }
}
