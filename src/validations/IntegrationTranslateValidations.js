const Integration = require('../models/integration')
const IntegrationTranslate = require('../models/integrationTranslate')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async existIntegration(integrationId) {
        try {
            const integrationExists = await Integration.findById(integrationId).lean()
            if (!integrationExists) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    notEmptyBody(body) {
        const size = Object.keys(body).length
        if (size == 1) {
            throw {status: 400, message: responseMessages._ERROR_INCOMPLETE_BODY}
        }

        return true
    },

    async integrationTranslateExist(id) {
        try {
            const integrationTranslateExist = await IntegrationTranslate.findById(id).lean()
            if (!integrationTranslateExist) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }
            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
