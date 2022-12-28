import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  monday: boolean;

  @Column({ default: false })
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

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
