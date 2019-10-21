import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { typOrmConfig } from './config/typeorm.config';

@Module({
  imports: [ TypeOrmModule.forRoot(typOrmConfig), AdminModule, AuthModule, UserModule, EventModule],
  providers: [AppService],
  controllers: [AppController]
})
export class AppModule {}