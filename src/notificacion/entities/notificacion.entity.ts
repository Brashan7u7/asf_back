import { Auditoria } from 'src/auditoria/entities/auditoria.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('notificacion')
export class Notificacion {
    @PrimaryGeneratedColumn({ name: 'id_notificacion' })
    id: number;

    @Column()
    cambio: string;

    @Column()
    fecha: Date;

    @ManyToOne(() => User, usuario => usuario.notificaciones)
    usuario: User;

    @ManyToOne(() => Auditoria)
    auditoria: Auditoria;
}