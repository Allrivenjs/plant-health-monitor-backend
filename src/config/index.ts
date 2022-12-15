import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || 'dev',
  appPort: process.env.APP_PORT || '3000',
  dbUsername: process.env.DB_USERNAME,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: Number(process.env.DB_PORT) || 3312 ,
  dbPassword: process.env.DB_PASSWORD || '',
  secret: process.env.JWT_SECRET,
};
