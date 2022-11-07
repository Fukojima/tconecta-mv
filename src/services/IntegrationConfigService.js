const IntegrationConfig = require('../models/integrationConfig')
const {
    existIntegrationAndUser,
    existEmptyFields,
    existConfigIntegration,
    notEmptyBody,
} = require('../validations/ConfigValidations')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async create(body) {
        try {
            await existIntegrationAndUser(body.integrationId, body.userId)
            !existEmptyFields(body)

            const config = await IntegrationConfig.create(body)
            // auditLogger(0, 'info', responseMessages._SUCCESS_INTEGRATION, userId)
            return config
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async update(id, body) {
        try {
            await existConfigIntegration(id)
            notEmptyBody(body)

            const updateConfig = await IntegrationConfig.findByIdAndUpdate(id, body, {new: true})
            return updateConfig
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async show(id, userId) {
        try {
            await existConfigIntegration(id)
            const intConfig = await IntegrationConfig.findOne({_id: id, userId: userId}, {userId: 0, integrationId: 0})

            if (!intConfig) {
                throw {status: 404, message: responseMessages._ERROR_LOGIN_NOT_FOUND}
            }

            return intConfig
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
