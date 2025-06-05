import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { Notificacion } from './entities/notificacion.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly repo: Repository<Notificacion>,
  ) {}

  async create(dto: CreateNotificacionDto) {
    const nueva = this.repo.create({
      ...dto,
      usuario: { id: dto.usuario_id },
      auditoria: { id: dto.auditoria_id },
    });
    return this.repo.save(nueva);
  }

  async findAll() {
    return this.repo.find({ relations: ['usuario', 'auditoria'] });
  }

  async findOne(id: number) {
    const notificacion = await this.repo.findOne({
      where: { id },
      relations: ['usuario', 'auditoria'],
    });

    if (!notificacion) {
      throw new NotFoundException(`Notificación con id ${id} no encontrada`);
    }

    return notificacion;
  }

  async update(id: number, dto: UpdateNotificacionDto) {
    const notificacion = await this.repo.findOne({ where: { id }, relations: ['usuario'] });

    if (!notificacion) {
      throw new NotFoundException(`Notificación con id ${id} no encontrada`);
    }

    Object.assign(notificacion, dto);

    if (dto.usuario_id) {
      notificacion.usuario = { id: dto.usuario_id } as User;
    }
    return this.repo.save(notificacion);
  }

  async remove(id: number) {
    const notificacion = await this.repo.findOneBy({ id });

    if (!notificacion) {
      throw new NotFoundException(`Notificación con id ${id} no encontrada`);
    }

    await this.repo.delete(id);
    return { message: `Notificación con id ${id} eliminada correctamente` };
  }
}
