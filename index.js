import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv-safe';
config();

import router from './src/routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.APP_PORT, () => {
  console.log(`REST API started on port ${process.env.APP_PORT}`);
});

app.get('/', async (request, response)=>{
  response.send("Hello world");
});
