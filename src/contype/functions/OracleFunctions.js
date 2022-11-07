const responseMessages = require('../../models/responseMessages')
const contype = require('../functions/UtilityFunctions')
const logger = require('../../log/logger')('oracle')

module.exports = {
    async getAllTables(owner, conn) {
        const query = `
        SELECT all_tab_columns.TABLE_NAME TABLE_NAME,
        COUNT (all_tab_columns.column_name) qtd,
        all_objects.last_ddl_time last_ddl
        FROM  all_tab_columns,
              all_objects
        WHERE all_tab_columns.table_name = all_objects.object_name
          AND all_tab_columns.owner = '${owner}'
          AND all_objects.owner = '${owner}'
          AND all_objects.object_type='TABLE'
        GROUP BY all_tab_columns.TABLE_NAME,
                 all_objects.last_ddl_time
        ORDER BY all_tab_columns.table_name      
       `

        logger.info(`Executando query: ${query}`)

        try {
            const results = await conn.execute(query, {})
            await conn.close()

            contype.renameKeys(results.rows, 'TABLE_NAME', 'tableName')
            contype.renameKeys(results.rows, 'QTD', 'colQuantity')
            contype.renameKeys(results.rows, 'LAST_DDL', 'lastUpdate')
            logger.info(results.rows)
            if (results.rows.length > 0) {
                return results.rows
            } else {
                return {success: false, error: responseMessages._ERROR_TABLE_NFOUND_OWNER}
            }
        } catch (error) {
            return {success: false, error: error.message}
        }
    },
    getByPeriod(period) {
        let query = ''
        for (let i = 0; i < period.length; i++) {
            if (period[i]?.interval == 'monthly') {
                query = query.concat(`AND to_char(${period[i].tableName},'mm/rrrr') = to_char(sysdate,'mm/rrrr')`)
            }
        }
        return query
    },

    async getFilterTables(owner, conn, tables) {
        const query = `
        SELECT r.table_name AS tabela
        FROM all_constraints r,
        all_constraints o,
        all_cons_columns u
        WHERE r.r_owner = '${owner}'
        AND u.CONSTRAINT_NAME = r.CONSTRAINT_NAME
        AND r.r_constraint_name = o.constraint_name
        AND o.constraint_type in ('P','U')
        AND r.constraint_type = 'R'
        AND o.table_name in (${tables})`

        logger.info(`Executando query: ${query}`)

        try {
            const results = await conn.execute(query, {})
            contype.renameKeys(results.rows, 'TABELA', 'tableName')
            logger.info(results.rows)

            let resultTables = ''
            results.rows.forEach((e) => {
                if (e.tableName == results.rows[results.rows.length - 1].tableName) {
                    resultTables = resultTables.concat(`'${e.tableName}'`)
                } else {
                    resultTables = resultTables.concat(`'${e.tableName}',`)
                }
            })

            if (results.rows.length > 0) {
                const subQuery = `
                SELECT all_tab_columns.TABLE_NAME TABLE_NAME,
                COUNT (all_tab_columns.column_name) qtd,
                all_objects.last_ddl_time last_ddl
                FROM  all_tab_columns,
                      all_objects
                WHERE all_tab_columns.table_name = all_objects.object_name
                  AND all_tab_columns.owner = 'DBAMV'
                  AND all_objects.owner = 'DBAMV'
                  AND  all_tab_columns.TABLE_NAME IN (${resultTables})
                  AND all_objects.object_type='TABLE'
                GROUP BY all_tab_columns.TABLE_NAME,
                         all_objects.last_ddl_time
                ORDER BY all_tab_columns.table_name`

                logger.info(`Executando query: ${subQuery}`)
                const finalResults = await conn.execute(subQuery, {})

                await conn.close()
                logger.info(finalResults.rows)

                contype.renameKeys(finalResults.rows, 'TABLE_NAME', 'tableName')
                contype.renameKeys(finalResults.rows, 'QTD', 'colQuantity')
                contype.renameKeys(finalResults.rows, 'LAST_DDL', 'lastUpdate')
                logger.info(results.rows)
                return finalResults.rows
            } else {
                return {success: false, error: responseMessages._ERROR_TABLE_NFOUND_OWNER}
            }
        } catch (error) {
            return {success: false, error: responseMessages._ERROR_FILTER_TABLES}
        }
    },

    async getAllColumns(query, conn) {
        try {
            logger.info(`Executando query: ${query}`)
            const results = await conn.execute(query, {})

            contype.renameKeys(results.rows, 'COLUMN_NAME', 'columnName')
            contype.renameKeys(results.rows, 'DATA_LENGTH', 'limit')
            contype.renameKeys(results.rows, 'DATA_TYPE', 'type')
            contype.renameKeys(results.rows, 'CONSTRAINT_TYPE', 'relation')
            contype.renameKeys(results.rows, 'NULLABLE', 'isNullable')
            logger.info(results.rows)

            if (results.rows.length > 0) {
                return results.rows
            } else {
                return {success: false, error: responseMessages._ERROR_TABLE_NFOUND_OWNER}
            }
        } catch (error) {
            return {success: false, error: responseMessages._ERROR_TABLE_NOT_FOUND}
        }
    },
}
