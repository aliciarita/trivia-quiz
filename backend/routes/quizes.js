import express from 'express';

const router = express.Router();

// Aqui estão definidas as requisições do servidor de acordo com a url

// e.g. http://localhost:PORT/quizes/ é uma requisição de GET em que o servidor envia 'QUIZES!'
router.get('/', (req, res) => {
  res.send('QUIZES!');
});

export default router;
