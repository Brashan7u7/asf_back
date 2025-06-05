import { Auditoria } from 'src/auditoria/entities/auditoria.entity';
import { Notificacion } from 'src/notificacion/entities/notificacion.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id: number;

  @Column()
  nombre: string;

  @Column({ name: 'ape_paterno' })
  ape_paterno: string;

  @Column({ name: 'ape_materno' })
  ape_materno: string;

  @Column()
  correo: string;

  @Column({ name: 'contraseña' })
  contrasena: string;

  @Column()
  rol: boolean;

  @OneToMany(() => Auditoria, auditoria => auditoria.usuario)
  auditorias: Auditoria[];

  @OneToMany(() => Notificacion, notificacion => notificacion.usuario)
  notificaciones: Notificacion[];
}
