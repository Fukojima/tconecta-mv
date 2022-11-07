
const responseMessage = require('../models/responseMessages')
const jwt = require('../utils/jwt')
const jwtweb = require('jsonwebtoken')
module.exports = {
    async generateSecret(id) {
        try {
            const _secret = await jwt.generateTokenPayload(String(id))
            return _secret
        } catch (error) {
            console.log('error sec', error)
            return responseMessage._ERROR_GENERATE_SECRET
        }
    },

    async decodeSecret(token) {
        try {
            jwtweb.verify(token, process.env.SECRET, function (error, decoded) {
                if (error) {
                    console.log('e', error)
                }

                if (decoded) {
                    console.log('decoded', decoded.id)
                    return (decoded.id)
                }else{
                    return 'error'
                }
            })
        } catch (error) {
            
        }


    },
}
