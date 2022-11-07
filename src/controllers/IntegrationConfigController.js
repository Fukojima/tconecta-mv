const responseMessages = require('../models/responseMessages')
const oracleService = require('../services/OracleService')
const logger = require('../log/logger')('integrationConfig')
const IntegrationConfigService = require('../services/IntegrationConfigService')
const {existEmptyFields} = require('../validations/ConfigValidations')
const OracleFunctions = require('../contype/functions/OracleFunctions')

module.exports = {
    async createIntegrationConfig(req, res) {
        try {
            const body = req.body
            await IntegrationConfigService.create(body)
            return res.status(201).json({message: responseMessages._SUCCESS_INTEGRATION_CONFIG})
        } catch (error) {
            return res
                .status(error.status || 500)
                .json({error: error.message || responseMessages._ERROR_INTEGRATION_CONFIG})
        }
    },

    async updateIntegrationConfig(req, res) {
        try {
            const {id} = req.params
            const body = req.body

            await IntegrationConfigService.update(id, body)
            return res.json({message: responseMessages._SUCCESS_UPDATE})
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_UPDATE})
        }
    },

    async showIntegrationConfig(req, res) {
        try {
            const {id} = req.params
            const body = req.body
            const intConfig = await IntegrationConfigService.show(id, body.userId, {userId: 0, integrationId: 0})
            return res.json(intConfig)
        } catch (error) {
            return res.status(error.status || 500).json({error: error.message || responseMessages._ERROR_NOT_FOUND})
        }
    },

    async accessDatabase(req, res) {
        try {
            const body = req.body
            // !existEmptyFields(body)

            logger.info(body)
            const connectionString =
                body.connectionSettings.host + ':' + body.connectionSettings.port + '/' + body.connectionSettings.sid

            let conn = await oracleService.connection(
                body.connectionSettings.username,
                body.connectionSettings.password,
                connectionString,
            )

            // if (!conn.success) {
            //     return res.status(400).json({ connection: conn, error: responseMessages._ERROR_ACCESS_DATABASE })
            // }

            let tables = await OracleFunctions.getAllTables(body.connectionSettings.owner.toUpperCase(), conn)

            if (tables.error) {
                logger.error(tables.error)
                return res.status(400).json(tables)
            } else {
                return res.json(tables)
            }
        } catch (error) {
            return res.status(500).json({error: responseMessages._ERROR_ACCESS_DATABASE})
        }
    },

    async filterTables(req, res) {
        try {
            const body = req.body
            !existEmptyFields(body)

            const tablesToFilter = req.body.tables
            const connectionString =
                body.connectionSettings.host + ':' + body.connectionSettings.port + '/' + body.connectionSettings.sid

            let conn = await oracleService.connection(
                body.connectionSettings.username,
                body.connectionSettings.password,
                connectionString,
            )

            if (!conn.success) {
                return res.status(400).json({connection: conn, error: responseMessages._ERROR_ACCESS_DATABASE})
            }

            let tables = await OracleFunctions.getFilterTables(
                body.connectionSettings.owner.toUpperCase(),
                conn,
                tablesToFilter,
            )

            if (tables.error) {
                logger.error(tables.error)
                return res.status(400).json(tables)
            } else {
                return res.json(tables)
            }
        } catch (error) {
            return res.status(500).json({error: responseMessages._ERROR_FILTER_TABLES})
        }
    },

    async getColumns(req, res) {
        try {
            const body = req.body
            !existEmptyFields(body)

            const result = await oracleService.buildGetColumns(body)
            if (!result.length > 0) {
                return res.status(404).json({success: false, error: responseMessages._ERROR_ASSOCIATIONS_COLUMNS})
            }

            return res.json(result)
        } catch (error) {
            return res.status(500).json({error: responseMessages._ERROR_FILTER_TABLES})
        }
    },
}
