import { Module } from '@nestjs/common';
import { NoticiaService } from './noticia.service';
import { NoticiaController } from './noticia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticia } from './entities/noticia.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Noticia]),
    AuthModule
  ],
  controllers: [NoticiaController],
  providers: [NoticiaService],
  exports: [NoticiaService],
})
export class NoticiaModule {}
