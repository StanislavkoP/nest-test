import { Module, MiddlewareConsumer, HttpStatus } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [AdminController],
  providers: [UserService],
  imports: [AuthModule, UserModule]
})
export class AdminModule {}