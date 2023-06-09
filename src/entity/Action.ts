import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Garden } from './Garden';
import { ActionType } from './ActionType';

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  payload: string;

  @Column()
  pending: boolean;

  @ManyToOne(() => Garden, (garden) => garden.actions, {onDelete:'CASCADE'})
  garden: Garden;

  @ManyToOne(() => ActionType, (actionType) => actionType.actions)
  actionType: ActionType;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
