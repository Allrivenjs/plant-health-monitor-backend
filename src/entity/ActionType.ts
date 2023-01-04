import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Action } from './Action';

export enum ActionTypes {
  WATERING,
  LOW_WATER,
  HIGH_TEMPERTURE,
  LOW_TEMPERTURE,
  HIGH_SUN,
  LOW_SUN,
  HIGH_HUMIDITY,
  LOW_HUMIDITY,
};

@Entity()
export class ActionType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ActionTypes,
  })
  type: ActionTypes;

  @Column({})
  description: string;

  @OneToMany(() => Action, (action) => action.actionType)
  actions: Action[];

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
