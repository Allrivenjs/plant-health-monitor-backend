import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn,} from 'typeorm';
import {User} from './User';
import {Action} from './Action';
import {GardenInformation} from './GardenInformation';
import {Notifications} from './Notifications';
import {Schedule} from './Schedule';

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

  @OneToOne(() => Schedule, (schedule) => schedule.garden)
  @JoinColumn()
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.garden)
  user: User;

  @OneToMany(() => Action, (action) => action.garden)
  actions: Action[];

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

  static assignDataToGarden(garden: Garden, name: string, image: string, plant_type: string, min_temperature: number, max_temperature: number, water_levels: Levels, sun_levels: Levels, user: User, schedule: Schedule) {
    garden.name = name;
    garden.image = image;
    garden.plant_type = plant_type;
    garden.min_temperature = min_temperature;
    garden.max_temperature = max_temperature;
    garden.water_levels = water_levels;
    garden.sun_levels = sun_levels;
    garden.user = user;
    garden.schedule = schedule;
    return garden;
  }

  static makeGarden(name: string, image: string, plant_type: string, min_temperature: number, max_temperature: number, water_levels: Levels, sun_levels: Levels, user: User, schedule: Schedule) {
    return this.assignDataToGarden(new Garden(), name, image, plant_type, min_temperature, max_temperature, water_levels, sun_levels, user, schedule);
  }

  static updateGarden(garden: Garden, name: string, image: string, plant_type: string, min_temperature: number, max_temperature: number, water_levels: Levels, sun_levels: Levels, user: User, schedule: Schedule) {
    return this.assignDataToGarden(garden, name, image, plant_type, min_temperature, max_temperature, water_levels, sun_levels, user, schedule);
  }

}
