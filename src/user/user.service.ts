import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { createAdminDto } from 'src/admin/admin.dto';

export type User = {
  userId: Number,
  username: String,
  password: String,
  role: String,
};

@Injectable()
export class UserService {
    private readonly users: User[];
    
    constructor(
      // @InjectRepository(UserRepository)
      // private readonly userRepository: UserRepository
    ) {
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

    async getAllUsers() {
      return this.users
    }

    // createAdmin(createAdminDto: createAdminDto) {
    //   const {email, password} = createAdminDto;

    //   const admin = new createAdminDto();
    // }
}
