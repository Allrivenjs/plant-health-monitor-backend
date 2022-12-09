import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import {User} from "./User";
import {Action} from "./Action";
import {Garden} from "./Garden";

@Entity()
export class Notifications {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column()
    payload: string

    @Column()
    read_at: Date

    @ManyToOne(() => Garden, garden => garden.notifications)
    garden: Garden

}
