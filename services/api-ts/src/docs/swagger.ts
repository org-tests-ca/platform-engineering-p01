import swaggerUi from 'swagger-ui-express'; // Middleware para servir a interface Swagger UI no Express
import YAML from 'yamljs'; // Biblioteca para carregar arquivos YAML e convertê-los em objetos JavaScript
import path from 'path'; // Módulo nativo do Node.js para manipulação de caminhos de arquivos

// Caminho corrigido: volta uma pasta a partir do diretório atual (__dirname) e acessa o arquivo swagger.yaml
const swaggerPath = path.resolve(__dirname, '../../swagger.yaml'); // Resolve o caminho absoluto do arquivo swagger.yaml

const swaggerDocument = YAML.load(swaggerPath); // Carrega e converte o arquivo YAML em um objeto utilizável pelo Swagger UI

export { swaggerUi, swaggerDocument }; // Exporta os módulos para serem usados na configuração das rotas da API
