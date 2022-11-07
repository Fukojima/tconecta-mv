const mongoUriBuilder = require('mongo-uri-builder')
const mongoose = require('mongoose')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async serviceConnection(body) {
        try {
            if (!body) {
                throw {status: 404, message: responseMessages._ERROR_INCOMPLETE_BODY}
            }

            let uri = mongoUriBuilder({
                username: body.username,
                password: body.password,
                host: body.host,
                port: body.port,
                database: body.database,
            })

            uri = mongoose.connection
            uri.on('error', () => {
                throw {status: 500, message: responseMessages._ERROR_MONGO_CONNECTION}
            })

            return uri
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
