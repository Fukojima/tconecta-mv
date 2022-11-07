const IntegrationService = require('../services/IntegrationService')
const responseMessages = require('../models/responseMessages')
const {generateIntegrationUrl} = require('../services/DynamicService')

module.exports = {
    async createIntegration(req, res) {
        try {
            const body = req.body
            let integrationToken

            const integration = await IntegrationService.create(body)
             
            //melhorar implementação
            if (body.trigger == 'manual') {
                integrationToken = await generateIntegrationUrl(integration)
                return res.status(201).json({
                    messages: {
                        success: responseMessages._SUCCESS_CREATE,
                        url: `${process.env.DYNAMIC_ENDPOINT}${integrationToken.url}`,
                        secret: integrationToken._secret,
                    },
                })
            } else {
        
                return res.status(201).json({
                    messages: {
                        success: responseMessages._SUCCESS_CREATE
                    },
                })
            }
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_CREATE})
        }
    },

    async updateIntegration(req, res) {
        try {
            const id = req.params.id
            const body = req.body

            await IntegrationService.update(id, body)
            return res.json({message: responseMessages._SUCCESS_UPDATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },

    async showAllIntegrations(req, res) {
        try {
            const body = req.body
            const integration = await IntegrationService.showAll(body.userId)
            return res.json(integration)
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },

    async showOneIntegration(req, res) {
        try {
            const body = req.body
            const id = req.params.id
            const integration = await IntegrationService.showOne(id, body.userId)
            return res.json(integration)
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
