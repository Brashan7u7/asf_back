import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuditoriaModule } from './auditoria/auditoria.module';
import { NoticiaModule } from './noticia/noticia.module';
import { NotificacionModule } from './notificacion/notificacion.module';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'asf_db',
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    UserModule,
    AuditoriaModule,
    NoticiaModule,
    NotificacionModule,
    AuthModule
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
