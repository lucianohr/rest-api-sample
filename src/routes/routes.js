import { connection } from "../database/mysqlConnection.js";
import express from 'express';
import AlunosController from "../controllers/alunosController.js";

const router = express.Router();

router.get('/alunos', AlunosController.listar);
router.post('/alunos', AlunosController.inserir);
router.put('/alunos/:codigo', AlunosController.atualizar);
router.delete('/alunos/:codigo', AlunosController.excluir);
router.get('/alunos/:codigo', AlunosController.exibir);

export default router;