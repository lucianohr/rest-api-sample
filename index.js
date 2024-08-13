import express from 'express';
import cors from 'cors';
import router from './src/routes/routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
  console.log('REST API started on port 4000');
});

app.get('/', async (request,response)=>{
  response.send("Hello world");
});
