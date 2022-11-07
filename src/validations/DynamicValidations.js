const responseMessages = require('../models/responseMessages')
const Integration = require('../models/integration')
const IntegrationConfig = require('../models/integrationConfig')

module.exports = {
    notEmptyBody(integration) {
        const size = Object.keys(integration).length
        if (size == 1) {
            throw {status: 400, message: responseMessages._ERROR_INCOMPLETE_BODY}
        }
        return true
    },

    async integrationExist(integration) {
        try {
            const findIntegration = await Integration.findById({_id: integration._id})
            if (!findIntegration) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }
            return findIntegration
        } catch (error) {
            console.log(error)
            throw {status: error.status, message: error.message}
        }
    },

    async integrationConfigExist(integrationId) {
        try {
            const integrationConfig = await IntegrationConfig.findById({integrationId})
            if (!integrationConfig) {
                throw {status: 400, message: responseMessages._ERROR_NOT_FOUND_INT_CONFIG}
            }

            return integrationConfig
        } catch (error) {
            console.log(error)
            throw {status: error.status, message: error.message}
        }
    },

    verifyJWTarguments(url, _secret) {
        if (!url || !_secret) {
            throw {status: 400, message: responseMessages._ERROR_GENERIC_CREDENTIALS}
        }
        return true
    },

    existIntegrationToken(result) {
        if (!result) {
            throw {status: 401, message: responseMessages._ERROR_DYNAMIC_TOKEN}
        }

        return result
    },
}
