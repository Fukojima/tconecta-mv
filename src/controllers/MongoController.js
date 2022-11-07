const MongoService = require('../services/MongoService')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async connection(req, res) {
        try {
            await MongoService.serviceConnection(req.body)
            return res.json({message: responseMessages._SUCCESS_MONGO_CONNECTION})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
