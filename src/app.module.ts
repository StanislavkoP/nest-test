import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';

@Module({
  imports: [AdminModule, AuthModule, UserModule, EventModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}