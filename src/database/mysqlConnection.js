import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv-safe';
config();

export const connection = await createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DB
});
