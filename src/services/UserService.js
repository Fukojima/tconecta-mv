const User = require('../models/user')
const responseMessages = require('../models/responseMessages')
const {userExist, notEmptyBody, companyExist} = require('../validations/UserValidations')

module.exports = {
    async create(body) {
        try {
            notEmptyBody(body)
            await companyExist(body.company)

            const user = await User.create(body)
            return user
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async update(userId, body) {
        try {
            await userExist(userId)
            await companyExist(body.company)
            notEmptyBody(body)

            const user = await User.findByIdAndUpdate(userId, body).populate({
                path: 'company',
                select: 'corporate_name -_id',
            })

            if (!user) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return user
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async show(userId) {
        try {
            await userExist(userId)

            const user = await User.findById(userId, {password: 0, refreshToken: 0, createdAt: 0}).populate({
                path: 'company',
                select: 'corporate_name -_id',
            })

            if (!user) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }
            return user
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
