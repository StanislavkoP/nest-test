import { Module, MiddlewareConsumer, HttpStatus } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRespository } from './admin.respository';
import { AdminService } from './admin.service';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from '../auth/session.serializer';
import { AdminLocalStrategy } from './admin.local.strategy';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminRespository]),
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    }),
    AuthModule,
    EventModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, UserService, SessionSerializer, AdminLocalStrategy],
})
export class AdminModule {}