const dataModeling = require('../models/dataModeling')
const responseMessages = require('../models/responseMessages')
const axios = require('axios').default
const logger = require('../log/logger')('apiConnection')
const whatsappUrl = 'https://8e4d-177-221-37-197.sa.ngrok.io/whatsapp/sendMessage'
const User = require('../models/user')

module.exports = {
    async postData(integration, url, data) {
        try {
            logger.notice(responseMessages._RUNNING_INTEGRATION)
         
            try {

                const response = await axios({
                    url: url[0].url,
                    method: 'post',
                    data: data,
                        'maxContentLength': Infinity,
                        'maxBodyLength': Infinity
                });
                return {success: true, message: response.data.message}
            } catch (error) {
                console.log('error', error)
            }
          

        } catch (error) {
            console.log('new', error)
            logger.error(`${responseMessages._ERROR_REQUEST_MANAGER}: ${url[0].url}`)
            try {
                const user = await User.findById({_id: integration.userId, notify: true})
                const sendMessage = await axios.post(whatsappUrl, {
                    message_body: `${responseMessages._ERROR_INTEGRATION} Integração: ${integration.name} \nURL: ${url[0].url} \nStatus: 500 \nMotivo do erro: Conexão recusada/Servidor não acessível.`,
                    wpp_number: `+${user.phone}`,
                })

                return {success: false}
            } catch (error) {
                logger.error(responseMessages._ERROR_SEND_MESSAGE)
                return {success: false}
            }
        }
    },
}
