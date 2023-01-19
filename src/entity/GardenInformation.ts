import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Garden } from './Garden';

@Entity()
export class GardenInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  temperature: number;

  @Column()
  humidity: number;

  @Column()
  sun_level: number;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToOne(() => Garden, (garden) => garden.gardenInformation)
  garden: Garden;
}
