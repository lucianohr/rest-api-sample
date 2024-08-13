import { connection } from '../database/mysqlConnection.js';

class AlunosController {
  async listarAlunos(request, response) {
    console.log(`GET /alunos`);
    const [results] = await connection.query('SELECT * FROM alunos');
    response.json(results);
  }
}

export default new AlunosController();