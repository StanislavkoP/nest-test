import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SessionSerializer } from './session.serializer';
import { AuthenticatedGuard } from './login.guard';

@Module({
  imports: [
    UserModule,
    // JwtModule.register({
    //   secret: jwtConstants.secretKey,
    //   signOptions: { expiresIn: '2h' }
    // }),
    PassportModule.register({
      defaultStrategy: 'local',
      session: true,
    })
  ],
  providers: [AuthService, LocalStrategy, SessionSerializer, AuthenticatedGuard],
  exports: [AuthService ]
})
export class AuthModule {}
