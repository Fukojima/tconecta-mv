const AuthService = require('../services/AuthService')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async login(req, res) {
        try {
            const body = req.body
            const login = await AuthService.login(body)

            res.setHeader('token', login.token)
            return res.json(login)
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
