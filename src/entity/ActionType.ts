import { Entity, PrimaryGeneratedColumn, Column, ManyToOne  } from "typeorm"
import {Action} from "./Action";


@Entity()
export class ActionType {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    @ManyToOne(() => Action, action => action.ActionType)
    actions!: Action[]

    @Column()
    created_at: Date

    @Column()
    updated_at: Date


}
