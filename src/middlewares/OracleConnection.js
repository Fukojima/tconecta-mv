const oracledb = require('oracledb')
const responseMessages = require('../models/responseMessages')
const logger = require('../log/logger')('oracledb')

module.exports = {
    async connection(req, res) {
        logger.info('req', req.body)
        try {
            logger.info('Estabelecendo conexão...')
            let conn = await oracledb.getConnection({
                user: req.body.user,
                password: req.body.pasword,
                connectString: req.body.host + req.body.port + '/' + req.body.tns,
            })
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            logger.info({message: responseMessages._SUCCESS_ORACLE_CONNECTION})
            req.body.conn = conn
            next()

            return res.json({message: responseMessages._SUCCESS_ORACLE_CONNECTION})
        } catch (error) {
            logger.error(`Erro: ${error.message}`)
            return res.status(500).json({error: responseMessages._ERROR_ORACLE_CONNECTION})
        }
    },
}
