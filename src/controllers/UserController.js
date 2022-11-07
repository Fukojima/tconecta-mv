const UserService = require('../services/UserService')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async createUser(req, res) {
        try {
            const body = req.body
            await UserService.create(body)
            return res.status(201).json({message: responseMessages._SUCCESS_CREATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_CREATE})
        }
    },

    async updateUser(req, res) {
        try {
            const userId = req.params.id
            const body = req.body

            await UserService.update(userId, body)
            return res.json({message: responseMessages._SUCCESS_UPDATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },

    async showUser(req, res) {
        try {
            const userId = req.params.id
            const user = await UserService.show(userId)
            return res.json({user})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },
}
