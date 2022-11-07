const schedule = require('node-schedule')
const oracledb = require('oracledb')
const logger = require('../log/logger')('oracle')
const contype = require('../contype/functions/UtilityFunctions')
const oracleQuerys = require('../contype/querys/OracleQuerys')
const IntegrationTranslate = require('../models/integrationTranslate')
const oracleErrorsConnection = require('../errors/OracleErrorsConnection')
const OracleFunctions = require('../contype/functions/OracleFunctions')
const responseMessages = require('../models/responseMessages')

// oracledb.initOracleClient({
//     libDir: 'C:\\instantclient_21_3x64',
// })

module.exports = {
    async connection(user, password, connectString) {
        try {
            logger.alert(responseMessages._ESTABLISHING_ORACLE_CONNECTION)
            let conn = await oracledb.getConnection({
                user,
                password,
                connectString,
            })

            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

            logger.notice(responseMessages._SUCCESS_ORACLE_CONNECTION)
            conn.success = true
            return conn
        } catch (error) {
            const result = oracleErrorsConnection(error)
            logger.error(`${responseMessages._ERROR_ACCESS_DATABASE}. Erro: ${result.error}`)
            logger.info(responseMessages._TRY_REESTANLISH_CONNECTION)
        }
    },

    async tableConsult(conn, querySettings, integration, params) {
        const column = contype.getColumns(querySettings)
        let table = contype.getTables(querySettings)
        let relation = contype.getRelations(querySettings)
        relation = contype.sanitizeCommas(relation)
        let period = contype.getPeriod(querySettings)

        logger.notice(`Iniciando integração: ${integration?.name}`)
        // logger.info(`Colunas: ${column}`)
        // logger.info(`Tabelas: ${table}`)
        // logger.info(`Relacionamentos: [${relation}]`)

        oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
        oracledb.autoCommit = true

        let query = `\nSELECT ${column} \nFROM `
        query = query.concat(`${table}`)

        if (relation.length > 0) {
            query = query.concat(` \nWHERE ${relation}`)
            const variations = contype.getVariations(querySettings)
            query = query.concat(`${variations}`)
        }
        let newQuery = `
        SELECT 
    CIDADE.NM_CIDADE,
    CIDADE.CD_UF,
    PACIENTE.CD_PACIENTE,
    PACIENTE.NM_PACIENTE,
    PACIENTE.DT_NASCIMENTO,
    PACIENTE.NM_SOCIAL_PACIENTE,
    PACIENTE.NR_CPF,
    PACIENTE.NR_IDENTIDADE,
    PACIENTE.DS_OM_IDENTIDADE,
    PACIENTE.NR_CNS,
    PACIENTE.TP_SANGUINEO,
    PACIENTE.SN_DOADOR,
    PACIENTE.CD_PROFISSAO,
    PACIENTE.NR_DDD_CELULAR,
    PACIENTE.NR_CELULAR,
    PACIENTE.NM_PAI,
    PACIENTE.NM_MAE,
    PACIENTE.NM_CONJUGE,
    PACIENTE.SN_VIP,
    PACIENTE.CD_ETNIA,
    PACIENTE.CD_NATURALIDADE,
    PACIENTE.TP_ESTADO_CIVIL,
    PACIENTE.TP_SEXO,
    PACIENTE.NR_DDD_CELULAR,
    PACIENTE.NR_CELULAR,
    PACIENTE.DS_ENDERECO,
    PACIENTE.NR_ENDERECO,
    PACIENTE.CD_CIDADE,
    PACIENTE.NM_BAIRRO,
    PACIENTE.TP_SEXO,
    PACIENTE.NR_CEP,
    PACIENTE.TP_SITUACAO,
    PACIENTE.EMAIL,
    PACIENTE.NM_TUTOR,
    PACIENTE.CD_TIP_PAREN,
    PACIENTE.NR_CPF_TUTOR
FROM 
    PACIENTE,
    CIDADE
WHERE NR_CPF = ${params} 
AND PACIENTE.CD_CIDADE = CIDADE.CD_CIDADE 
    ORDER BY
        PACIENTE.NM_PACIENTE`
        // logger.info(`\nExecutando query:  ${newQuery}`)

        try {
            const results = await conn.execute(newQuery, {})
            oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT
            await conn.close()

            // logger.info(`Resultado: ${JSON.stringify(results.rows[0], null, 3)}`)
            return results.rows
        } catch (error) {
            logger.error(`Erro: ${error.message}`)
            return error.message
        }
    },

    async translate(integrationId, integrationData) {
        try {
            const model = await IntegrationTranslate.find({integrationId: integrationId}).exec()
            let translateConfig = model[0].fields
            let keys = Object.keys(integrationData[0])
            const translationModel = translateConfig.map((item) => {
                for (let index = 0; index < keys.length; index++) {
                    const key = item.key
                    const originKey = keys[index]
                    const translateKey = item.translate
                    if (key == originKey) {
                        contype.renameKeys(integrationData, key, translateKey)
                    }
                }
                return integrationData
            })
            // for (let i =0; translationModel.length > i; i++){
            //     contype.toCamelCase(translationModel[i])
            // }

            return translationModel[0]
        } catch (error) {
            logger.error(`Erro: ${error.message}`)
            return error.message
        }
    },

    async buildGetColumns(body) {
        try {
            const connectionString =
                body.connectionSettings.host + ':' + body.connectionSettings.port + '/' + body.connectionSettings.sid

            let conn = await this.connection(
                body.connectionSettings.username,
                body.connectionSettings.password,
                connectionString,
            )

            let result = []

            for (let i = 0; body.tables.length > i; i++) {
                let res = {table: '', columns: []}
                let query = oracleQuerys.getColumnsQuery(body.connectionSettings.owner, body.tables[i])
                res.table = body.tables[i]
                let columns = await OracleFunctions.getAllColumns(query, conn, body.tables)
                res.columns = columns
                result.push(res)
            }

            return result
        } catch (error) {
            return error.message
        }
    },
    modelingData(data) {
           if (data.length == 1){
            let patient = {
                  
                physic_national: data[0].physic_national, //Required
                ident_national: data[0].ident_national, //Required
                issuing_body: data[0].issuing_body, //Required
                name: data[0].name, //Required
                birth_date: data[0].birth_date || '1988-02-29T03:00:00.000Z', //Required
                social_name: data[0].social_name,
                sus_card: data[0].sus_card,
                type_blood: data[0].type_blood,
                profession: data[0].profession,
                dad_name: data[0].dad_name || 'Não informado', //Required
                mother_name: data[0].mother_name, //Required
                spouse_name: data[0].spouse_name,
                vip: data[0].vip == 'N' ? false : true,
                ethnicity: 'Outros', //Required
                nationality: data[0].nationality, //Required
                naturality: data[0].naturality, //Required
                marital_status: data[0].marital_status,
                gender: data[0].gender == 'M'? 'Masculino':'Feminino', //Required,
                contact:{
                       cell_phone: data[0].ddd + data[0].phone,
                       cep: data[0].cep,
                       state: data[0].state,
                       district: data[0].district,
                       street: data[0].street,
                       address_number: data[0].address_number,
                       county:data[0].county

                }
            }
            return patient
           }
            let patients =[];
            for (let i =0; data.length > i; i++){
            
            
            let patient = {
                  
                    physic_national: data[i].physic_national, //Required
                    ident_national: data[i].ident_national, //Required
                    issuing_body: data[i].issuing_body, //Required
                    name: data[i].name, //Required
                    birth_date: data[i].birth_date || '1988-02-29T03:00:00.000Z', //Required
                    social_name: data[i].social_name,
                    sus_card: data[i].sus_card,
                    type_blood: data[i].type_blood,
                    profession: data[i].profession,
                    dad_name: data[i].dad_name || 'Não informado', //Required
                    mother_name: data[i].mother_name, //Required
                    spouse_name: data[i].spouse_name,
                    vip: data[i].vip == 'N' ? false : true,
                    ethnicity: 'Outros', //Required
                    nationality: data[i].nationality, //Required
                    naturality: data[i].naturality, //Required
                    marital_status: data[i].marital_status,
                    gender: data[i].gender == 'M'? 'Masculino':'Feminino', //Required,
                    contact:{
                           cell_phone: data[i].ddd + data[i].phone,
                           cep: data[i].cep,
                           state: data[i].state,
                           district: data[i].district,
                           street: data[i].street,
                           address_number: data[i].address_number,
                           county:data[i].county

                    },
                    created_by:"ba3ee1eb-32a8-4bd1-a852-f1ddaec90e8a"
                }
            
        patients.push(patient)
            }
            const model = {
                patients:patients
            }
        return model
    },
}
