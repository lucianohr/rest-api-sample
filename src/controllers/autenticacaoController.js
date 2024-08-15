import bcrypt from 'bcrypt';
import { connection } from '../database/mysqlConnection.js';
import jwt from 'jsonwebtoken';

class AutenticacaoController {
  login = async (request, response) => {
    console.log('POST /login');
    console.log(request.body);

    try {
      const { usuario, senha } = request.body;
      const query = 'SELECT codigo, nome, usuario, senha FROM alunos WHERE usuario = ?';
      const [ result ] = await connection.query(query, [usuario]);
      const [ aluno ] = result;

      if (aluno && bcrypt.compareSync(senha, aluno.senha)) {
        // token expira em 2 horas
        const token = jwt.sign({ id: aluno.codigo }, process.env.SECRET, { expiresIn: 7200 });
        const query = `UPDATE alunos SET token = ? WHERE codigo = ?`;
        await connection.query(query, [token, aluno.codigo]);

        return response.json({ auth: true, token: token });
      }
      else {
        response.status(401).send('Usuário e/ou Senha inválidos');
      }
    } catch (error) {
      console.log(error);
      response.status(500).send(error.message);
    }
  };

  logout = async (request, response) => {
    console.log('POST /logout');

    try {
      const query = `UPDATE alunos SET token = NULL WHERE codigo = ?`;
      await connection.query(query, [request.userId]);

      response.status(204).json({ auth: false, token: null });
    }
    catch (error) {
      response.status(500).send(error.message);
    }
  }
}

export default new AutenticacaoController();