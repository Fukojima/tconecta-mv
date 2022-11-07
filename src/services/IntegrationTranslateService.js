const IntegrationTranslate = require('../models/integrationTranslate')
const {
    notEmptyBody,
    existIntegration,
    integrationTranslateExist,
} = require('../validations/integrationTranslateValidations')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async create(body) {
        try {
            await existIntegration(body.integrationId)
            notEmptyBody(body)

            const integrationTranslate = await IntegrationTranslate.create(body)
            return integrationTranslate
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async show(translateId) {
        try {
            await integrationTranslateExist(translateId)

            const integrationTranslate = await IntegrationTranslate.findById(translateId, {
                refreshToken: 0,
                createdAt: 0,
            }).populate({
                path: 'integrationId',
                select: 'name -_id',
            })

            if (!integrationTranslate) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return integrationTranslate
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
