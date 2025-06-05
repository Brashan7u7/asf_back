import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  id: number;

  @Column({ default: false })
  is_admin: boolean;

  @Column()
  names: string;

  @Column()
  lastname: string;

  @Column()
  mail: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column()
  address: string;
}
