import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Garden } from './Garden';

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  payload: string;

  @Column()
  read_at: Date;

  @ManyToOne(() => Garden, (garden) => garden.notifications)
  garden: Garden;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
