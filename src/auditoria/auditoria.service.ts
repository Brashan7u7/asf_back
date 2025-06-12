import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAuditoriaDto } from "./dto/create-auditoria.dto";
import { UpdateAuditoriaDto } from "./dto/update-auditoria.dto";
import { Auditoria } from "./entities/auditoria.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(Auditoria)
    private readonly repo: Repository<Auditoria>
  ) {}

  async create(dto: CreateAuditoriaDto) {
    const nueva = this.repo.create({
      ...dto,
      usuario: { id: dto.usuario_id },
    });
    return this.repo.save(nueva);
  }

  async findAlldos() {
    return this.repo.find({ relations: ["usuario"] });
  }

  async findAll(page: number, limit: number, search?: string, filtro?: string) {
    const query = this.repo.createQueryBuilder("Auditorias");
    if (filtro) {
      query.andWhere('LOWER("Auditorias"."estatus") LIKE LOWER(:filtro)', {
        filtro: `%${filtro}%`,
      });
    }

    if (search) {
      query.andWhere(
        `LOWER("Auditorias"."nombre") LIKE LOWER(:search)
     `,
        {
          search: `%${search}%`,
        }
      );
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const auditoria = await this.repo.findOne({
      where: { id },
      relations: ["usuario"],
    });

    if (!auditoria) {
      throw new NotFoundException(`Auditoría con id ${id} no encontrada`);
    }

    return auditoria;
  }

  async update(id: number, dto: UpdateAuditoriaDto) {
    const auditoria = await this.repo.findOne({
      where: { id },
      relations: ["usuario"],
    });

    if (!auditoria) {
      throw new NotFoundException(`Auditoría con id ${id} no encontrada`);
    }

    Object.assign(auditoria, dto);

    if (dto.usuario_id) {
      auditoria.usuario = { id: dto.usuario_id } as User;
    }

    return this.repo.save(auditoria);
  }

  async remove(id: number) {
    const auditoria = await this.repo.findOne({ where: { id } });

    if (!auditoria) {
      throw new NotFoundException(`Auditoría con id ${id} no encontrada`);
    }

    await this.repo.delete(id);
    return { message: `Auditoría con id ${id} eliminada correctamente` };
  }

  async search(search: string): Promise<Auditoria[]> {
    return this.repo.find({
      where: { nombre: search },
      select: ["nombre"],
    });
  }
  async filtro(filtro: string): Promise<Auditoria[]> {
    return this.repo.find({
      where: { estatus: Number(filtro) },
    });
  }
}
