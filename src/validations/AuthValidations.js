const User = require('../models/user')
const sanitize = require('mongo-sanitize')
const {compare} = require('bcryptjs')
const responseMessages = require('../models/responseMessages')

module.exports = {
    notEmptyBody(body) {
        const size = Object.keys(body).length
        if (size == 1) {
            throw {status: 400, message: responseMessages._ERROR_INCOMPLETE_BODY}
        }
        return true
    },

    existToken(result) {
        if (!result.token) {
            throw {status: 401, message: responseMessages._ERROR_UNAUTHORIZED_TOKEN}
        }

        return {
            name: result.name,
            email: result.email,
            token: result.token,
        }
    },

    async validUser(body) {
        try {
            const user = await User.findOne({email: sanitize(body.email)})
            if (!user) {
                throw {status: 404, message: responseMessages._ERROR_LOGIN_NOT_FOUND}
            }
            return user
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async validPass(body, validatedUser) {
        try {
            const validPassword = await compare(body.password, validatedUser.password)
            if (!validPassword) {
                throw {status: 404, message: responseMessages._ERROR_LOGIN_NOT_FOUND}
            }
            return validPassword
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
