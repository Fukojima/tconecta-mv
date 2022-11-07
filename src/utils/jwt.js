const jwt = require('jsonwebtoken')

module.exports = {
    async generateTokenPayload(payload, expires = process.env.JWT_EXPIRATION) {
        console.log('payload', payload)
        const token = jwt.sign({id:payload}, process.env.SECRET, {
            expiresIn: Number(process.env.JWT_EXPIRATION),
        })
        console.log('token',token)
        return token
    },
}
