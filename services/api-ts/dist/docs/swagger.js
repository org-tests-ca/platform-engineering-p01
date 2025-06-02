"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerDocument = exports.swaggerUi = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express")); // Middleware para servir a interface Swagger UI no Express
exports.swaggerUi = swagger_ui_express_1.default;
const yamljs_1 = __importDefault(require("yamljs")); // Biblioteca para carregar arquivos YAML e convertê-los em objetos JavaScript
const path_1 = __importDefault(require("path")); // Módulo nativo do Node.js para manipulação de caminhos de arquivos
// Caminho corrigido: volta uma pasta a partir do diretório atual (__dirname) e acessa o arquivo swagger.yaml
const swaggerPath = path_1.default.resolve(__dirname, '../../swagger.yaml'); // Resolve o caminho absoluto do arquivo swagger.yaml
const swaggerDocument = yamljs_1.default.load(swaggerPath); // Carrega e converte o arquivo YAML em um objeto utilizável pelo Swagger UI
exports.swaggerDocument = swaggerDocument;
