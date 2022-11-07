const sanitize = require('mongo-sanitize')
const jwt = require('../utils/jwt')
const User = require('../models/user')
const {notEmptyBody, existToken, validUser, validPass} = require('../validations/AuthValidations')

module.exports = {
    async login(body) {
        try {
            notEmptyBody(body)
            const validatedUser = await validUser(body)
            await validPass(body, validatedUser)

            const result = {
                ...validatedUser._doc,
                token: await jwt.generateTokenPayload({_id: String(validatedUser._id)}),
            }

            const refreshToken = await jwt.generateTokenPayload(
                {_id: String(validatedUser._id)},
                process.env.REFRESH_EXPIRATION,
            )
            await User.findOneAndUpdate({email: sanitize(body.email)}, {refreshToken: refreshToken})

            const userCredentials = existToken(result)
            console.log(userCredentials)
            return userCredentials
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
