import express, { response } from 'express';
import jwt from 'jsonwebtoken';
import AlunosController from '../controllers/alunosController.js';
import AutenticacaoController from '../controllers/autenticacaoController.js';
import { connection } from '../database/mysqlConnection.js';

const router = express.Router();

const tokenInvalido = (response) => {
  return response.status(401).json({ auth: false, message: 'Token inválido!' });
}

const validarToken = (request, response, next) => {
  const token = request.headers['authorization'];
  if (!token) {
    return response.status(401).json({ auth: false, message: 'Token de autenticação não informado!' });
  }
  jwt.verify(token, process.env.SECRET, async (error, decoded) => {
    if (error) {
      return tokenInvalido(response);
    }
    const query = 'SELECT codigo, usuario, token FROM alunos WHERE codigo = ?';
    const [ result ] = await connection.query(query, [decoded.id]);
    const user = result[0];
    if (!user || (user && user.token !== token)) {
      return tokenInvalido(response);
    }
    request.userId = decoded.id;
    next();
  });
};

router.post('/login', AutenticacaoController.login);
router.post('/logout', validarToken, AutenticacaoController.logout);
router.get('/alunos', validarToken, AlunosController.listar);
router.post('/alunos', validarToken, AlunosController.inserir);
router.put('/alunos/:codigo', validarToken, AlunosController.atualizar);
router.delete('/alunos/:codigo', validarToken, AlunosController.excluir);
router.get('/alunos/:codigo', validarToken, AlunosController.exibir);

export default router;