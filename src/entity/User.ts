import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from "typeorm"
import {Garden} from "./Garden";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @OneToMany(() => Garden, garden => garden.user)
    garden: Garden[]

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

}
