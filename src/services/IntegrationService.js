const Integration = require('../models/integration')
const {
    userExist,
    integrationExist,
    notEmptyBody,
    validateDate,
    nameIntegrationExist,
} = require('../validations/IntegrationValidations')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async create(body) {
        try {
            notEmptyBody(body)
            await userExist(body.userId)
            // await nameIntegrationExist(body)
            validateDate(body.expiredAt)
            const integration = await Integration.create(body)
            return integration
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async update(id, body) {
        try {
            await integrationExist(id)
            notEmptyBody(body)

            const update = await Integration.findByIdAndUpdate(id, body, {new: true}).populate({
                path: 'userId',
                select: 'name -_id',
            })

            return update
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async showAll(userId) {
        try {
            await userExist(userId)

            const integration = await Integration.find({userId: userId}, {createdAt: 0}).populate({
                path: 'userId',
                select: 'name -_id',
            })

            return integration
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },

    async showOne(id, userId) {
        try {
            await integrationExist(id)
            await userExist(userId)

            const integration = await Integration.findOne(
                {_id: id, userId: userId},
                {createdAt: 0, updatedAt: 0},
            ).populate({path: 'userId', select: 'name -_id'})

            if (!integration) {
                throw {status: 404, message: responseMessages._ERROR_NOT_FOUND}
            }

            return integration
        } catch (error) {
            throw {status: error.status, message: error.message}
        }
    },
}
