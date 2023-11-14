import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { config } from './config';

export const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: config.dbHost,
  port: config.dbPort,
  username: config.dbUsername,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: false,
  logging: false,
  timezone: 'America/Bogota',
  entities: ['src/entity/**/*{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
});
