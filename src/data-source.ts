import "reflect-metadata"
import { DataSource } from "typeorm"



export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "mysql",
    host: "localhost",
    port: 3312,
    username: "root",
    password: "secret",
    database: "plant_health_monitor_db",
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscriber/**/*{.ts,.js}'],
})
