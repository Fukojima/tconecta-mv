const IntegrationConfig = require('../models/integrationConfig')
const Integration = require('../models/integration')
const OracleService = require('../services/OracleService')
const RequestManager = require('./RequestManager')
const responseMessages = require('../models/responseMessages')
const logger = require('../log/logger')('oracle')

module.exports = {
    async startOracleIntegrations(id, docId) {
        try {
            if (id) {
          
                const oracleConnections = await IntegrationConfig.find({integrationId: id})
                
                // oracleConnections.map(async (integration) => {
                    for (const integration of oracleConnections){
                    const connectionString =
                        integration.connectionSettings.host +
                        ':' +
                        integration.connectionSettings.port +
                        '/' +
                        integration.connectionSettings.sid
    
                    const oracleIntegration = await Integration.findById(integration.integrationId).exec()
                    const conn = await OracleService.connection(
                        integration.connectionSettings.username,
                        integration.connectionSettings.password,
                        connectionString,
                      
                    )
                    //adicionar condicional de conexão válida
                    let integrationData = await OracleService.tableConsult(
                        conn,
                        integration.querySettings,
                        oracleIntegration,
                       docId
                    )
                    
            
                    logger.info(`Dados : ${JSON.stringify(integrationData, null, 3)}`)
                    if (integrationData.length < 1 ){
             
                        return ({status: 'noData'})
                    }
                    let integrationFormattedData = await OracleService.translate(integration.integrationId, integrationData)
    
                    //logger.info(`Dados traduzidos: ${JSON.stringify(integrationFormattedData)}`, integrationFormattedData)
                    
                    let modelData = OracleService.modelingData(integrationFormattedData)
                    //  logger.info(`Dados Modelados: ${JSON.stringify(modelData, null, 4)}`)
                    return modelData
                }
          
            }else{
                const oracleConnections = await IntegrationConfig.find({active: true, databaseType: 'oracledb'})
                if (!oracleConnections.length > 0) {
                    logger.info(responseMessages._INTEGRATION_NOT_FOUND)
                }
    
                oracleConnections.map(async (integration) => {
                    const connectionString =
                        integration.connectionSettings.host +
                        ':' +
                        integration.connectionSettings.port +
                        '/' +
                        integration.connectionSettings.sid
    
                    const oracleIntegration = await Integration.findById(integration.integrationId).exec()
                    const conn = await OracleService.connection(
                        integration.connectionSettings.username,
                        integration.connectionSettings.password,
                        connectionString,
                    )
                    //adicionar condicional de conexão válida
                    let integrationData = await OracleService.tableConsult(
                        conn,
                        integration.querySettings,
                        oracleIntegration,
                    )
    
                    //logger.info(`Dados : ${JSON.stringify(integrationData, null, 3)}`)
    
                    let integrationFormattedData = await OracleService.translate(integration.integrationId, integrationData)
    
                    //logger.info(`Dados traduzidos: ${JSON.stringify(integrationFormattedData)}`, integrationFormattedData)
    
                    let modelData = OracleService.modelingData(integrationFormattedData)
                    // logger.info(`Dados Modelados: ${JSON.stringify(modelData, null, 4)}`)
                    try {
                        const requestIntegration = await RequestManager.postData(
                            oracleIntegration,
                            oracleIntegration.endpoints,
                            modelData,
                        )
    
                        if (requestIntegration.success) {
                            logger.info(responseMessages._SUCCESS_INTEGRATION)
                            logger.info(`Retorno da integração: ${requestIntegration.message}`)
                        } else {
                            logger.error(responseMessages._ERROR_INTEGRATION)
                            throw {status: 400, message: responseMessages._ERROR_INTEGRATION}
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    console.log('teste')
                    return ('teste')
                })
            }
     
  
        } catch (error) {
            logger.error(responseMessages._ERROR_INTEGRATION)
            return error.message
        }
    },
}
