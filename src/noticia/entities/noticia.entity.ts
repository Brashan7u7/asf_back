import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('noticia')
export class Noticia {
    @PrimaryGeneratedColumn({ name: 'id_noticias' })
    id: number;

    @Column()
    titulo: string;

    @Column()
    descripcion: string;

    @Column()
    fecha: Date;

    @Column()
    img_portada: string;
}