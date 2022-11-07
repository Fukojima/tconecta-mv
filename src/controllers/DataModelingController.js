const AuthService = require('../services/AuthService')
const responseMessages = require('../models/responseMessages')
const DataModeling = require('../models/dataModeling')

module.exports = {
    async create(req, res) {
        try {
            const body = req.body
            await DataModeling.create(body)
            return res.status(201).json({message: responseMessages._SUCCESS_INTEGRATION_CONFIG})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
