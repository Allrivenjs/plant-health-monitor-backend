import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Garden } from './Garden';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', {unique: true})
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Garden, (garden) => garden.user)
  garden: Garden[];

  @Column('timestamp', {default: new Date()})
  created_at: Date;

  @Column('timestamp', {default: new Date()})
  updated_at: Date;
}
