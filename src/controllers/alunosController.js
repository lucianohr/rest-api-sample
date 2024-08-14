import { connection } from '../database/mysqlConnection.js';

class AlunosController {
  async listar(request, response) {
    console.log('GET /alunos');
    const [results] = await connection.query('SELECT codigo, nome, cpf, matricula, nascimento FROM alunos');
    response.json(results);
  };

  async inserir(request, response) {
    console.log('POST /alunos');
    console.log(request.body);
    const query = 'INSERT INTO alunos (nome, cpf, matricula, nascimento) VALUES (?, ?, ?, ?)';
    try {
      await connection.query(query, [
        request.body.nome,
        request.body.cpf,
        request.body.matricula,
        request.body.nascimento
      ]);
      response.status(201).send();
    } catch (error) {
      console.log(error);
      response.status(400).send(error.message);
    }
  };

  async atualizar(request, response) {
    console.log(`PUT /alunos/${request.params.codigo}`);
    console.log(request.body);
    let fields = [];
    if (request.body.nome) fields.push(`nome = "${request.body.nome}"`)
    if (request.body.cpf) fields.push(`cpf = "${request.body.cpf}"`)
    if (request.body.matricula) fields.push(`matricula = "${request.body.matricula}"`)
    if (request.body.nascimento) fields.push(`nascimento = "${request.body.nascimento}"`)
    const query = `UPDATE alunos SET ${fields.join(', ')} WHERE codigo = ?`;
    try {
      await connection.query(query, [request.params.codigo]);
      response.status(200).send();
    } catch (error) {
      console.log(error);
      response.status(400).send(error.message);
    }
  };

  async excluir(request, response) {
    console.log(`DELETE /alunos/${request.params.codigo}`);
    const query = `DELETE FROM alunos WHERE codigo = ?`;
    try {
      await connection.query(query, [request.params.codigo]);
      response.status(204).send();
    } catch (error) {
      console.log(error);
      response.status(400).send(error.message);
    }
  };

  async exibir(request, response) {
    console.log(`GET /alunos/${request.params.codigo}`);
    const query = `SELECT codigo, nome, cpf, matricula, nascimento FROM alunos WHERE codigo = ?`;
    try {
      const [result] = await connection.query(query, [request.params.codigo]);
      response.json(result[0]);
    } catch (error) {
      console.log(error);
      response.status(400).send(error.message);
    }
  };
}

export default new AlunosController();