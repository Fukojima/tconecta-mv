const DynamicService = require('../services/DynamicService')
const responseMessages = require('../models/responseMessages')
const validator = require('validator')
const {startOracleIntegrations} = require('../managers/OracleIntegrationManager')
module.exports = {
    async startDynamicIntegration(req, res) {
        try {
            
            let isCpf = false;
    let isCns = false;
            const { docId } = req.params;
            if (validator.cpf.isValid(docId)){
                isCpf = true;
                isCns = false;
            }else if(!validator.cpf.isValid(docId) && docId.length == 15){
                isCpf = false;
                isCns = true;
            }else{
                return res.status(400).send({success: false, response: 'Documento inválido'})
            }
            
             startOracleIntegrations()
            

        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
