import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { Garden } from './Garden';
import { Schedule } from './Schedule';

@Entity()
export class DayOfSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayNumber: number;

  @Column()
  keyName: string;

  @Column()
  name: string;

  @Column()
  abbreviation: string;
  
  @Column({ default: false })
  active: boolean;

  @Column({ default: 0 })
  cuantity: number;

  @ManyToOne(() => Schedule, (schedule) => schedule.daysOfSchedule)
  schedule: Schedule;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  static assignDataToDayOfSchedule(
    dayOfSchedule: DayOfSchedule,
    dayNumber: number,
    keyName: string,
    name: string,
    abbreviation: string,
    active: boolean,
    cuantity: number,
    schedule: Schedule
    ) {
    dayOfSchedule.dayNumber = dayNumber;
    dayOfSchedule.keyName = keyName;
    dayOfSchedule.name = name;
    dayOfSchedule.abbreviation = abbreviation;
    dayOfSchedule.active = active;
    dayOfSchedule.cuantity = cuantity;
    dayOfSchedule.schedule = schedule;
    return dayOfSchedule;
  }

  static makeDayOfSchedule(
    dayNumber: number,
    keyName: string,
    name: string,
    abbreviation: string,
    active: boolean,
    cuantity: number,
    schedule: Schedule
  ) {

    return this.assignDataToDayOfSchedule(new DayOfSchedule(), dayNumber, keyName, name, abbreviation, active, cuantity, schedule);
  }
}
