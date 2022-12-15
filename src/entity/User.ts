import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Garden } from './Garden';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Garden, (garden) => garden.user)
  garden: Garden[];

  @Column('timestamp', {default: new Date()})
  created_at: Date;

  @Column('timestamp', {nullable: true})
  updated_at: Date;
}
