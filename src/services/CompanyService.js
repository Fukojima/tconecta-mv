const Company = require('../models/company')
const {notEmptyBody, companyExist} = require('../validations/CompanyValidations')

module.exports = {
    async create(body) {
        try {
            notEmptyBody(body)

            const company = await Company.create(body)
            return company
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async update(id, body) {
        try {
            await companyExist(id)
            notEmptyBody(body)

            const company = await Company.findByIdAndUpdate(id, body, {new: true})
            return company
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async show(id) {
        try {
            await companyExist(id)
            const company = await Company.findById(id, {createdAt: 0})
            return company
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
