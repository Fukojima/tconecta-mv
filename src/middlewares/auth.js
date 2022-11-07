const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = require('../utils/jwt')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async verifyJWT(req, res, next) {
        try {
            const token = req.headers['authorization']?.split(' ')[1]
            if (!token) {
                return res.status(401).json({error: responseMessages._ERROR_UNAUTHORIZED_TOKEN})
            }

            jwt.verify(token, process.env.SECRET, async function (error, decoded) {
                let acessToken
                if (error) {
                    if (error.message === 'jwt expired') {
                        const {_id} = jwt.decode(token)
                        const user = await User.findById(_id)

                        if (!user) {
                            return res.status(401).json({error: responseMessages._ERROR_UNAUTHORIZED_TOKEN})
                        }

                        jwt.verify(user.refreshToken, process.env.SECRET, async function (error, decoded) {
                            if (error) {
                                return res.status(401).json({error: responseMessages._ERROR_REFRESH_TOKEN})
                            }

                            const refreshToken = await auth.generateTokenPayload(
                                {_id: String(user._id)},
                                process.env.REFRESH_EXPIRATION,
                            )

                            acessToken = await auth.generateTokenPayload({_id: String(user._id)})
                            await User.findByIdAndUpdate(_id, {refreshToken: refreshToken})

                            const userId = _id
                            req.body.userId = userId
                            res.setHeader('acessToken', acessToken)
                            next()
                        })
                    }
                }

                if (decoded) {
                    const userId = decoded._id
                    req.body.userId = userId
                    next()
                }
            })
        } catch (error) {
            return res.status(500).json({error: responseMessages._ERROR_FETCH})
        }
    },
}
