const DynamicService = require('../services/DynamicService')
const responseMessages = require('../models/responseMessages')
const {startOracleIntegrations} = require('../managers/OracleIntegrationManager')
const validator = require('cpf-cnpj-validator')

module.exports = {
    async startDynamicIntegration(req, res) {
        try {
            const id = req.body.id
            let isCpf = false;
            let isCns = false;
                    const { docId } = req.query;

                    if (validator.cpf.isValid(docId)){
                        isCpf = true;
                        isCns = false;
                    }else if(!validator.cpf.isValid(docId) && docId.length == 15){
                        isCpf = false;
                        isCns = true;
                    }else{
                        return res.status(400).send({success: false, response: 'Documento inválido'})
                    }
            const doIntegration = await startOracleIntegrations(id, docId)
            if (doIntegration.status){
                return res.status(200).send({success: true, response: []})
            }
            return res.status(200).send({success: true, response: doIntegration})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_FETCH})
        }
    },
}
