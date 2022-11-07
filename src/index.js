require('events').EventEmitter.prototype._maxListeners = 50
require('events').defaultMaxListeners = 50

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const routes = require('./routes/routes')
const server = require('./config/server')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./docs/swagger.json')
const {startOracleIntegrations} = require('./managers/OracleIntegrationManager')
const app = express()
//
server.connect()
// 

// app.listen(process.env.PORT, '0.0.0.0')

let corsOptions = {
    origin: false,
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, token, Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
}

const optionsSwagger = {
    customSiteTitle: 'Tasconecta',
    customfavIcon: './assets/favicon.ico',
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.json())
app.use('/api', routes)
// app.use('/static', express.static(__dirname + 'assets'))
app.use('/api/connectivity/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, optionsSwagger))

app.all('*', (req, res, next) => {
    return res.status(404).json({
        error: 'Rota não encontrada.',
    })
})

app.use((error, req, res, next) => {
    return res.status(error.status || 500).json({
        error: 'Erro interno do Servidor.',
    })
})

module.exports = app
