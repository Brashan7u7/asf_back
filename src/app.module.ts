import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuditoriaModule } from "./auditoria/auditoria.module";
import { NoticiaModule } from "./noticia/noticia.module";
import { NotificacionModule } from "./notificacion/notificacion.module";
import { AuthModule } from "./auth/auth.module";
import { AppService } from "./app.service";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth/auth.guard";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || "5432"),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      logging: true,
      autoLoadEntities: true,
      synchronize: true,
      ssl: false,
    }),
    UserModule,
    AuditoriaModule,
    NoticiaModule,
    NotificacionModule,
    AuthModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
