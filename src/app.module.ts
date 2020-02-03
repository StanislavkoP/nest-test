import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { EventModule } from './event/event.module';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [ DatabaseModule,  AuthModule, UserModule, EventModule, AdminModule],
  controllers: [AppController]
})
export class AppModule {}