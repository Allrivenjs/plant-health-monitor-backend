import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const config = {
  env: process.env.NODE_ENV || 'dev',
  appPort: process.env.PORT || '3000',
  dbUsername: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: Number(process.env.DB_PORT) || 3312 ,
  dbPassword: process.env.DB_PASSWORD || '',
  secret: process.env.JWT_SECRET,
};

console.log(config.env);
