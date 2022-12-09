import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import {User} from "./User";
import {Action} from "./Action";
import {GardenInformation} from "./GardenInformation";
import {Notifications} from "./Notifications";

@Entity()
export class Garden {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    image: string

    @Column()
    plant_type: string

    @Column()
    min_temperature: number

    @Column()
    max_temperature: number

    @ManyToOne(() => User, user => user.garden)
    user: User

    @OneToMany(() => Action, action => action.garden)
    actions!: Action[]

    @OneToMany(() => GardenInformation, gardenInformation => gardenInformation.garden)
    gardenInformation!: GardenInformation[]

    @OneToMany(() => Notifications, notifications => notifications.garden)
    notifications!: Notifications[]

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

}
