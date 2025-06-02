// src/index.ts

import express from 'express'; // Importa o express
import cors from 'cors'; // ✅ Importa o middleware CORS
import { helloRouter } from './routes/hello.routes'; // Importa o roteador de saudação
import { userRouter } from './routes/user.routes'; // Importa o roteador de usuários
import { authRouter } from './routes/auth.routes'; // Importa o roteador de autenticação
import { connectToMongo } from './config/mongo'; // Importa a função de conexão com o MongoDB
import { connectToRedis } from './config/redis'; // Importa a função de conexão com o Redis
import { swaggerUi, swaggerDocument } from './docs/swagger'; // Importa documentação Swagger YAML

const app = express(); // Cria uma instância do express
const PORT = 4600; // Define a porta do servidor

// ✅ Middleware para permitir CORS (todas as origens durante o desenvolvimento)
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3001', // ou a porta definida no .env do frontend
// }));

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Rotas
app.use('/hello', helloRouter); // monta o roteador na rota /hello
app.use('/users', userRouter); // monta o roteador de usuários na rota /users
app.use('/auth', authRouter); // monta o roteador de autenticação na rota /auth

// Rota para acessar a documentação Swagger gerada via YAML
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Conecta ao MongoDB e Redis antes de iniciar o servidor
connectToMongo().then(async () => {
  await connectToRedis(); // aguarda a conexão com Redis antes de iniciar
  app.listen(PORT, () => { // Inicia o servidor na porta definida
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em http://localhost:${PORT}/docs`);
  });
});
