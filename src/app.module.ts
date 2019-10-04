import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [EventModule, AdminModule, AuthModule, UserModule],
})
export class AppModule {}