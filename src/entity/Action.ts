import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from "typeorm"
import {Garden} from "./Garden";
import {ActionType} from "./ActionType";


@Entity()
export class Action {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    payload!: string

    @Column()
    created_at!: Date

    @ManyToOne(() => Garden, garden => garden.actions)
    garden!: Garden

    @ManyToOne(() => ActionType, actionType => actionType.actions)
    ActionType!: ActionType

}
