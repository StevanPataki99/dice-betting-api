const host = process.env.DATABASE_HOST || 'localhost';
const port = parseInt(process.env.DATABASE_PORT || '5432', 10);
const username = process.env.DATABASE_USERNAME || 'test123';
const password = process.env.DATABASE_PASSWORD || 'pguser';
const database = process.env.DATABASE_NAME || 'dice-betting';

export default {
  host,
  port,
  username,
  password,
  database,
};
