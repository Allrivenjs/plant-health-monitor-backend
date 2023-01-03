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
}
