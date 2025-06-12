import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { AuditoriaService } from './auditoria.service';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';
import { UpdateAuditoriaDto } from './dto/update-auditoria.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('auditoria')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createAuditoriaDto: CreateAuditoriaDto) {
    return this.auditoriaService.create(createAuditoriaDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('filtro') filtro?: string ,
    @Query('search') search?: string,
  ) {
    if(filtro === 'todos'){filtro = undefined;}
    return this.auditoriaService.findAll(+page, +limit, filtro, search);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get('/dashboard')
  findAlldos() {
    return this.auditoriaService.findAlldos();
  }

  

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriaService.findOne(+id);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditoriaDto: UpdateAuditoriaDto) {
    return this.auditoriaService.update(+id, updateAuditoriaDto);
  }

  @ApiBearerAuth('jwt')
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriaService.remove(+id);
  }
}
