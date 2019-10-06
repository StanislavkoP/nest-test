import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secretKey,
      signOptions: { expiresIn: '2h' }
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService, LocalStrategy ]
})
export class AuthModule {}
