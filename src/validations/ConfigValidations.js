const Integration = require('../models/integration')
const IntegrationConfig = require('../models/integrationConfig')
const User = require('../models/user')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async existIntegrationAndUser(integrationId, userId) {
        try {
            const userExists = await User.findById(userId).lean()
            const integrationExists = await Integration.findById(integrationId).lean()

            if (!userExists || !integrationExists) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async existConfigIntegration(id) {
        try {
            const integrationConfigExists = await IntegrationConfig.findById(id).lean()
            if (!integrationConfigExists) {
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

    existEmptyFields(body) {
        try {
            const connectionSettings = body.connectionSettings
            if (connectionSettings.uri) {
                return true
            } else {
                for (const [key, value] of Object.entries(connectionSettings)) {
                    if (!value) {
                        throw response[key]
                    }
                }
            }
            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}

const response = {
    username: {status: 400, error: responseMessages._ERROR_EMPTY_USER},
    database: {status: 400, error: responseMessages._ERROR_EMPTY_DB},
    password: {status: 400, error: responseMessages._ERROR_EMPTY_PASS},
    port: {status: 400, error: responseMessages._ERROR_EMPTY_PORT},
    host: {status: 400, error: responseMessages._ERROR_EMPTY_HOST},
    sid: {status: 400, error: responseMessages._ERROR_EMPTY_SID},
    uri: {status: 400, error: responseMessages._ERROR_EMPTY_URI},
}
