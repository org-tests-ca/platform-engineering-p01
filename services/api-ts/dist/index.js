"use strict";
// src/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Importa o express
const cors_1 = __importDefault(require("cors")); // ✅ Importa o middleware CORS
const hello_routes_1 = require("./routes/hello.routes"); // Importa o roteador de saudação
const user_routes_1 = require("./routes/user.routes"); // Importa o roteador de usuários
const auth_routes_1 = require("./routes/auth.routes"); // Importa o roteador de autenticação
const mongo_1 = require("./config/mongo"); // Importa a função de conexão com o MongoDB
const redis_1 = require("./config/redis"); // Importa a função de conexão com o Redis
const swagger_1 = require("./docs/swagger"); // Importa documentação Swagger YAML
const app = (0, express_1.default)(); // Cria uma instância do express
const PORT = 4600; // Define a porta do servidor
// ✅ Middleware para permitir CORS (todas as origens durante o desenvolvimento)
app.use((0, cors_1.default)());
// app.use(cors({
//   origin: 'http://localhost:3001', // ou a porta definida no .env do frontend
// }));
// Middleware para interpretar JSON no corpo das requisições
app.use(express_1.default.json());
// Rotas
app.use('/hello', hello_routes_1.helloRouter); // monta o roteador na rota /hello
app.use('/users', user_routes_1.userRouter); // monta o roteador de usuários na rota /users
app.use('/auth', auth_routes_1.authRouter); // monta o roteador de autenticação na rota /auth
// Rota para acessar a documentação Swagger gerada via YAML
app.use('/docs', swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerDocument));
// Conecta ao MongoDB e Redis antes de iniciar o servidor
(0, mongo_1.connectToMongo)().then(async () => {
    await (0, redis_1.connectToRedis)(); // aguarda a conexão com Redis antes de iniciar
    app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando na porta ${PORT}`);
        console.log(`📚 Documentação disponível em http://localhost:${PORT}/docs`);
    });
});
