import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';
import { UpdateNoticiaDto } from './dto/update-noticia.dto';
import { Noticia } from './entities/noticia.entity';

@Injectable()
export class NoticiaService {
  constructor(
    @InjectRepository(Noticia)
    private readonly repo: Repository<Noticia>,
  ) {}

  async create(dto: CreateNoticiaDto) {
    const nueva = this.repo.create(dto);
    return this.repo.save(nueva);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const noticia = await this.repo.findOneBy({ id });

    if (!noticia) {
      throw new NotFoundException(`Noticia con id ${id} no encontrada`);
    }

    return noticia;
  }

  async update(id: number, dto: UpdateNoticiaDto) {
    const noticia = await this.repo.findOneBy({ id });

    if (!noticia) {
      throw new NotFoundException(`Noticia con id ${id} no encontrada`);
    }

    await this.repo.update(id, dto);

    return this.findOne(id); // devuelve la noticia actualizada
  }

  async remove(id: number) {
    const noticia = await this.repo.findOneBy({ id });

    if (!noticia) {
      throw new NotFoundException(`Noticia con id ${id} no encontrada`);
    }

    await this.repo.delete(id);
    return { message: `Noticia con id ${id} eliminada correctamente` };
  }
}
