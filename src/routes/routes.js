import { connection } from "../database/mysqlConnection.js";
import express from 'express';
import AlunosController from "../controllers/alunosController.js";

const router = express.Router();

router.get('/alunos', AlunosController.listarAlunos);

export default router;