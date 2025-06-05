import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NoticiaService } from './noticia.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('noticia')
export class NoticiaController {
  constructor(private readonly noticiaService: NoticiaService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createNoticiaDto: CreateNoticiaDto) {
    return this.noticiaService.create(createNoticiaDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.noticiaService.findAll();
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noticiaService.findOne(+id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoticiaDto: UpdateNoticiaDto) {
    return this.noticiaService.update(+id, updateNoticiaDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noticiaService.remove(+id);
  }
}
