const CompanyService = require('../services/CompanyService')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async createCompany(req, res) {
        try {
            await CompanyService.create(req.body)
            return res.status(201).json({message: responseMessages._SUCCESS_CREATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },

    async updateCompany(req, res) {
        try {
            const id = req.params.id
            const body = req.body

            await CompanyService.update(id, body)
            return res.json({message: responseMessages._SUCCESS_UPDATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },

    async showCompany(req, res) {
        try {
            const id = req.params.id
            const company = await CompanyService.show(id)
            return res.json({company})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
