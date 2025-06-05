import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { CommonModule } from './common/common.module';

import { ClsInterceptor } from './common/cls.interceptor';
import { ClsModule } from 'nestjs-cls';
import { UsuariosModule } from './usuarios/usuarios.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'asf_user',
      password: 'DJE20ben',
      database: 'asf_db',
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    AuthModule,
    UsuariosModule,
    CommonModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClsInterceptor,
    },
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
