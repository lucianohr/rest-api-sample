import bcrypt from 'bcrypt';
import { connection } from '../database/mysqlConnection.js';

class AlunosController {
  async listar(request, response) {
    console.log('GET /alunos');

    const [results] = await connection.query('SELECT codigo, nome, usuario, cpf, matricula, nascimento FROM alunos');
    response.json(results);
  };

  async inserir(request, response) {
    console.log('POST /alunos');
    console.log(request.body);

    const query = 'INSERT INTO alunos (nome, cpf, matricula, nascimento, usuario, senha) VALUES (?, ?, ?, ?, ?, ?)';
    try {
      const { nome, cpf, matricula, nascimento, usuario, senha } = request.body;
      const senhaHash = bcrypt.hashSync(senha, 10);

      await connection.query(query, [ nome, cpf, matricula, nascimento, usuario, senhaHash ]);
      response.status(201).send();
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  };

  async atualizar(request, response) {
    console.log(`PUT /alunos/${request.params.codigo}`);
    console.log(request.body);

    const { nome, cpf, matricula, nascimento, usuario, senha } = request.body;
    let fields = [];
    if (nome) fields.push(`nome = "${nome}"`);
    if (usuario) fields.push(`usuario = "${usuario}"`);
    if (senha) {
      const senhaHash = bcrypt.hashSync(senha, 10);
      fields.push(`senha = "${senhaHash}"`);
    }
    if (cpf) fields.push(`cpf = "${cpf}"`);
    if (matricula) fields.push(`matricula = "${matricula}"`);
    if (nascimento) fields.push(`nascimento = "${nascimento}"`);
    const query = `UPDATE alunos SET ${fields.join(', ')} WHERE codigo = ?`;

    try {
      await connection.query(query, [request.params.codigo]);
      response.status(200).send();
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
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
      response.status(500).send(error.message);
    }
  };

  async exibir(request, response) {
    console.log(`GET /alunos/${request.params.codigo}`);

    const query = `SELECT codigo, nome, usuario, cpf, matricula, nascimento FROM alunos WHERE codigo = ?`;
    try {
      const [result] = await connection.query(query, [request.params.codigo]);
      response.json(result[0]);
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  };
}

export default new AlunosController();