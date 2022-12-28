import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Action } from './Action';
import { GardenInformation } from './GardenInformation';
import { Notifications } from './Notifications';

export enum WaterLevels {
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
    enum: WaterLevels,
    default: WaterLevels.LOW,
  })
  water_levels: WaterLevels;

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
