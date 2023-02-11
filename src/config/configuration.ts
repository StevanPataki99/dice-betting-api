import { registerAs } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';

export const load = [
  registerAs('app', () => appConfig),
  registerAs('database', () => databaseConfig),
];
