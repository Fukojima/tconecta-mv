const logger = require('../log/logger')
const dictionary = require('../models/dictionary/enumFunctions')
const User = require('../models/user')

module.exports = {
    async auditLogger(functionCode, level, message, userId) {
        try {
            functionActive = dictionary.enumFunctions[functionCode]

            const user = await User.findOne({userId})
            logger(functionActive)[level](`The user ${user.name} access module ${functionActive}: ` + message)
        } catch (error) {
            error)
        }
    },
}
