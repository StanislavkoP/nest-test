import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { DatabaseModule } from './database/database.module';
import { DatabaseService } from './database/database.service';
import { PhotoModule } from './database/photo.module';

@Module({
  imports: [AdminModule, AuthModule, UserModule, EventModule, DatabaseModule, PhotoModule],
  providers: [AppService, DatabaseService],
  controllers: [AppController]
})
export class AppModule {}