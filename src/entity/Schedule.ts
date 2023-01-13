import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { DayOfSchedule } from './DayOfSchedule';
import { Garden } from './Garden';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => DayOfSchedule, (dayOfSchedule) => dayOfSchedule.schedule, {onDelete: 'CASCADE'})
  daysOfSchedule: DayOfSchedule[];

  @OneToOne(() => Garden, (garden) => garden.schedule, {onDelete: 'CASCADE'})
  garden: Garden;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
