import { loadEnvFile } from 'node:process';

loadEnvFile(process.cwd() + '/.env');

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  databaseUrl: process.env.DATABASE_URL,
};
