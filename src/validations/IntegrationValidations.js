const User = require('../models/user')
const Integration = require('../models/integration')
const {DateTime} = require('luxon')
const validator = require('email-validator')
const responseMessages = require('../models/responseMessages')
const {generateSecretPayload} = require('../utils/secret')

module.exports = {
    async userExist(userId) {
        try {
            const userExist = await User.findById({_id: userId}).lean()
            if (!userExist) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async nameIntegrationExist(body) {
        try {
            const userIntegrations = await Integration.find({userId: body.userId})
            if (userIntegrations.length > 0) {
                for (c = 0; c < userIntegrations.length; c++) {
                    if (userIntegrations[c].name === body.name) {
                        throw {status: 500, message: responseMessages._ERROR_INTEGRATION}
                    }
                }
            }
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async integrationExist(id) {
        try {
            const integrationExist = await Integration.findById({_id: id}).lean()
            if (!integrationExist) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }
            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    notEmptyBody(body) {
        let size = Object.keys(body).length
        if (size == 1) {
            throw {status: 400, message: responseMessages._ERROR_INCOMPLETE_BODY}
        }

        if (body.reportEmail) {
            if (!validator.validate(body.reportEmail)) {
                throw {status: 400, message: responseMessages._ERROR_INVALID_EMAIL}
            }
        }

        return true
    },

    validateDate(expiredAt) {
        const currentDate = DateTime.now().toISODate()
        if (expiredAt <= currentDate) {
            throw {status: 400, message: responseMessages._ERROR_EXPIRATION_DATE}
        }
        return true
    },
}
