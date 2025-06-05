import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './jwt.constants.secret';
import { AuditoriaModule } from 'src/auditoria/auditoria.module';
@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      secret: 'Clavemuuuysecreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, Reflector],
  exports: [AuthGuard, JwtModule, AuthService, JwtModule],
})
export class AuthModule {}
export { jwtConstants };
