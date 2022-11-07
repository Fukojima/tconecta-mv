const Sequelize = require('sequelize')
const responseMessages = require('../models/responseMessages')

const Database = async (database, username, password, host, port) => {
    const sequelize = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false,
        },
        logging: false,
        timezone: 'America/Sao_Paulo',
    })

    return sequelize
}

module.exports = {
    async serviceConnection(body) {
        try {
            if (!body) {
                throw {status: 404, message: responseMessages._ERROR_INCOMPLETE_BODY}
            }

            const conn = await Database(body.database, body.username, body.password, body.host, body.port)
            return conn
        } catch (error) {
            throw {status: error.status, error: error.message}
        }
    },
}
