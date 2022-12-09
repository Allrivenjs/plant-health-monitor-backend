import "reflect-metadata"
import { DataSource } from "typeorm"



export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "plant_health_backend",
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
})
