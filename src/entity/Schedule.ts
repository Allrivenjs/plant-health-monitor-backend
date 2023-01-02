import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Garden } from './Garden';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  monday: boolean;

  @Column({ default: true })
  tuesday: boolean;
  
  @Column({ default: false })
  wednesday: boolean;

  @Column({ default: false })
  thursday: boolean;

  @Column({ default: false })
  friday: boolean;

  @Column({ default: false })
  saturday: boolean;

  @Column({ default: false })
  sunday: boolean;

  @OneToOne(() => Garden, (garden) => garden.schedule)
  garden: Garden;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
