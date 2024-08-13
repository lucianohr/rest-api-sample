import { createConnection } from 'mysql2/promise';

export const connection = await createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Scopi123',
  port: 3306,
  database: 'teste_cimol'
});
