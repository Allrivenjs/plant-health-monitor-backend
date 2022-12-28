import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Action } from './Action';
import { GardenInformation } from './GardenInformation';
import { Notifications } from './Notifications';
import { Schedule } from './Schedule';

export enum Levels {
  LOW,
  MEDIUM,
  HIGH
};

@Entity()
export class Garden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  plant_type: string;

  @Column()
  min_temperature: number;

  @Column()
  max_temperature: number;

  @Column({
    type: 'enum',
    enum: Levels,
    default: Levels.LOW,
  })
  water_levels: Levels;

  @Column({
    type: 'enum',
    enum: Levels,
    default: Levels.LOW,
  })
  sun_levels: Levels;

  @OneToOne(() => Schedule)
  @JoinColumn()
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.garden)
  user: User;

  @OneToMany(() => Action, (action) => action.garden)
  actions!: Action[];

  @OneToMany(
    () => GardenInformation,
    (gardenInformation) => gardenInformation.garden
  )
  gardenInformation!: GardenInformation[];

  @OneToMany(() => Notifications, (notifications) => notifications.garden)
  notifications!: Notifications[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
