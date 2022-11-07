const jwt = require('jsonwebtoken')
const {generateTokenPayload} = require('../utils/jwt')
const {generateSecret} = require('../utils/secret')
const {notEmptyBody, integrationExist, existIntegrationToken} = require('../validations/DynamicValidations')
const startOracleIntegrations = require('../managers/OracleIntegrationManager')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async generateIntegrationUrl(integration) {
        try {
            notEmptyBody(integration)
            const _secret = await generateSecret(integration.userId)
            const findIntegration = await integrationExist(integration)

            console.log('find', findIntegration)

            let url = await generateTokenPayload(String(findIntegration._id))
            
            const result = {
                _secret,
                url,
            }

            const integrationToken = existIntegrationToken(result)
            return {
                url: integrationToken.url,
                _secret: _secret,
            }
        } catch (error) {
            console.log(error)
            throw {status: 400, message: responseMessages._ERROR_DYNAMIC_TOKEN}
        }
    },

    async startIntegration() {
        try {
            console.log('Rolou. Chegou aqui.')
            const startIntegration = await startOracleIntegrations(url)
            return startIntegration
        } catch (error) {
            console.log(error)
            throw {status: error.status, message: error.message}
        }
    },
}
