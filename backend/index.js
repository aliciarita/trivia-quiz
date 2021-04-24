import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import reqQuizes from './routes/quizes.js'

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

// Adiciona rota /quizes/... ao servidor do backend, com requisições definidas em routes/quizes.js:
// localhost:5000/quizes
app.use('/quizes', reqQuizes);

const CONNECTION_URL = 'mongodb+srv://admin:admin123@trivia-quiz.ymdco.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

// Conecta ao mongodb 
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

// Printa no console caso a conexão com o banco de dados tenha sido bem sucedida 
mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
});

mongoose.set('useFindAndModify', false);
