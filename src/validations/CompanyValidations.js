const Company = require('../models/company')
const {validateCNPJ} = require('../utils/common')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async companyExist(id) {
        try {
            const companyExist = await Company.findOne({_id: id}).lean()
            if (!companyExist) {
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

        if (body.cnpj) {
            if (!validateCNPJ(body.cnpj)) {
                throw {status: 404, message: responseMessages._ERROR_INVALID_CNPJ}
            }
        }

        return true
    },
}
