const jwt = require('jsonwebtoken')
const {verifyJWTarguments, integrationConfigExist} = require('../validations/DynamicValidations')
const secret = require('../utils/secret')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async verifyJWTIntegration(req, res, next) {
        const url = req.params.url
        const token = req.headers['authorization']
        let _secret;
        try {

               jwt.verify(token, process.env.SECRET, function (error, decoded) {
                if (error) {
                    console.log('e', error)
                }

                if (decoded) {
 
                    _secret = decoded.id
                    jwt.verify(url, process.env.SECRET, async (error, decode) => {
                        if (error) {
                        }
        
   
        
                        if (decode) {
                            const integrationId = decode.id
                            req.body.id = integrationId
                            next()
                        }
                    })
                }
            })

         
        } catch (error) {
            
        }

   
 
    },
}
