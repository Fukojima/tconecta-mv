const IntegrationTranslateService = require('../services/integrationTranslateService')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async createTranslate(req, res) {
        try {
            const body = req.body
            await IntegrationTranslateService.create(body)
            return res.status(201).json({message: responseMessages._SUCCESS_CREATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },

    async updateTranslate(req, res) {
        try {
            const id = req.params.id
            const body = req.body

            await IntegrationTranslate.update(id, body)
            return res.json({message: responseMessages._SUCCESS_UPDATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },

    async showTranslate(req, res) {
        try {
            const translateId = req.params.id
            const integrationTranslate = await IntegrationTranslateService.show(translateId)
            return res.json({integrationTranslate})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
