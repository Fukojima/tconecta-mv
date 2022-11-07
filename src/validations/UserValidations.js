const User = require('../models/user')
const responseMessages = require('../models/responseMessages')
const validator = require('email-validator')
const Company = require('../models/company')

module.exports = {
    async userExist(id) {
        try {
            const userExist = await User.findById(id).lean()
            if (!userExist) {
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

        if (body.email) {
            if (!validator.validate(body.email)) {
                throw {status: 400, message: responseMessages._ERROR_INVALID_EMAIL}
            }
        }

        return true
    },

    async companyExist(company) {
        try {
            const companyExist = await Company.findOne({_id: company}).lean()
            if (!companyExist) {
                throw {status: 404, message: responseMessages._ERROR_COMPANY_NOT_FOUND}
            }
            return true
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
