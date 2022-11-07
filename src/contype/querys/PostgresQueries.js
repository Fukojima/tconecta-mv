const contype = require('../functions/UtilityFunctions')
const logger = require('../../log/logger')('postgres')

module.exports = {
    async getAllTables(conn) {
        try {
            const query = `SELECT table_name, 
	            count(*) as column_count from information_schema."columns" 
	            where table_schema = 'public' 
	            GROUP by table_name 
	            order by column_count desc`
            this.getAllTables
            logger.info(`Executando query: ${query}`)
            const results = await conn.query(query)
            return results
        } catch (error) {
            console.log(error)
        }
    },
}
