import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('auditoria')
export class Auditoria {
    @PrimaryGeneratedColumn({ name: 'id_auditoria' })
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    @Column()
    observaciones: string;

    @Column()
    tipo: string;

    @Column()
    fecha: Date;

    @Column()
    estatus: number;

    @Column()
    entidad: string;

    @Column()
    activo: string;

    @Column()
    resultados: string;

    @Column()
    favorito: boolean;

    @ManyToOne(() => User, usuario => usuario.auditorias)
    usuario: User;
}