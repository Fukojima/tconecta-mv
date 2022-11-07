const mongoose = require('mongoose')
const responseMessages = require('../models/responseMessages')
const logger = require('../log/logger')('apiConnection')
require('dotenv').config()

function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        const server = mongoose.connection
        server.on('error', (error) => {
            logger.error(responseMessages._ERROR_API_CONNECTION)
        })
        server.once('connected', () => {
            logger.notice(responseMessages._SUCCESS_API_CONNECTION)
        })
    } catch (error) {
        return res.status(500).json({error: responseMessages._ERROR_API_CONNECTION})
    }
}

module.exports = {connect}
