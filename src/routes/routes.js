const {Router} = require('express')
const routes = Router()

const PostgresController = require('../controllers/PostgresController')
const MongoController = require('../controllers/MongoController')
const IntegrationController = require('../controllers/IntegrationController')
const IntegrationConfigController = require('../controllers/IntegrationConfigController')
const UserController = require('../controllers/UserController')
const CompanyController = require('../controllers/CompanyController')
const DataModelingController = require('../controllers/DataModelingController')
const PDFReports = require('../reports/PDFReports')
const Auth = require('../middlewares/auth')
const AuthController = require('../controllers/AuthController')
const MongoQueries = require('../contype/querys/MongoQueries')
const IntegrationTranslateController = require('../controllers/IntegrationTranslateController')
const DynamicController = require('../controllers/DynamicController')
const DynamicAuth = require('../middlewares/dynamicAuth')

//Rotas de Conexão do Banco - Postgres
routes.post('/connectivity/postgres', Auth.verifyJWT, PostgresController.connection)

//Rotas de Conexão do Banco - MongoDB
routes.post('/connectivity/mongodb', MongoController.connection)
routes.get('/connectivity/mongodb/query', MongoQueries.getAllCollections)
routes.get('/connectivity/mongodb/query-fields', MongoQueries.getAllFields)

//Rotas de Integração
routes.post('/connectivity/integrations', Auth.verifyJWT, IntegrationController.createIntegration)
routes.put('/connectivity/integrations/:id', Auth.verifyJWT, IntegrationController.updateIntegration)
routes.get('/connectivity/integrations/:id', Auth.verifyJWT, IntegrationController.showOneIntegration)
routes.get('/connectivity/integrations/user/current', Auth.verifyJWT, IntegrationController.showAllIntegrations)

//Rotas de Configurações das Integrações
routes.post('/connectivity/integrations-config', Auth.verifyJWT, IntegrationConfigController.createIntegrationConfig)
routes.put('/connectivity/integrations-config/:id', Auth.verifyJWT, IntegrationConfigController.updateIntegrationConfig)
routes.get('/connectivity/integrations-config/:id', Auth.verifyJWT, IntegrationConfigController.showIntegrationConfig)
routes.post('/connectivity/integrations-config/tables', Auth.verifyJWT, IntegrationConfigController.accessDatabase)
routes.post('/connectivity/integrations-config/filter-tables', Auth.verifyJWT, IntegrationConfigController.filterTables)
routes.post('/connectivity/integrations-config/get-columns', Auth.verifyJWT, IntegrationConfigController.getColumns)

//Rota Relatórios das Integrações
routes.get('/connectivity/integration/reports', PDFReports.report)

//Rotas de Usuário
routes.post('/connectivity/users', Auth.verifyJWT, UserController.createUser)
routes.put('/connectivity/users/:id', Auth.verifyJWT, UserController.updateUser)
routes.get('/connectivity/users/:id', Auth.verifyJWT, UserController.showUser)

// //Rotas de Empresas
routes.post('/connectivity/companies', Auth.verifyJWT, CompanyController.createCompany)
routes.put('/connectivity/companies/:id', Auth.verifyJWT, CompanyController.updateCompany)
routes.get('/connectivity/companies/:id', Auth.verifyJWT, CompanyController.showCompany)

//Rota de login
routes.post('/connectivity/login', AuthController.login)

//Rota de Translate
routes.post('/connectivity/translate', Auth.verifyJWT, IntegrationTranslateController.createTranslate)
routes.put('/connectivity/translate/:id', Auth.verifyJWT, IntegrationTranslateController.updateTranslate)
routes.get('/connectivity/translate/:id', Auth.verifyJWT, IntegrationTranslateController.showTranslate)

routes.post('/connectivity/data-modeling', DataModelingController.create)

//Rotas Dinâmicas
routes.get(
    '/connectivity/integrations-dynamics/:url',
    DynamicAuth.verifyJWTIntegration,
    DynamicController.startDynamicIntegration,
)



module.exports = routes
