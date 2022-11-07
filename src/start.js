const app = require('./index.js')
const server = require('./config/server')

server.connect()
app.listen(process.env.PORT, '0.0.0.0')
