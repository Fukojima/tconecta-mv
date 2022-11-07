module.exports = {
    getColumnsQuery(owner, table) {
        return `
            SELECT
            all_tab_columns.column_name,
            all_tab_columns.data_length,
            all_tab_columns.data_type,
            CASE WHEN all_constraints.constraint_type = 'C' THEN 'CONSTRAINT'
            WHEN all_constraints.constraint_type = 'P' THEN 'PRIMARY_KEY'
            WHEN all_constraints.constraint_type = 'R' THEN 'FOREIGN_KEY' ELSE all_constraints.constraint_type END AS constraint_type  ,
            ALL_TAB_COLUMNS.NULLABLE
            FROM
            all_tab_columns,
            all_constraints,
            all_cons_columns
            WHERE
            all_tab_columns.table_name =  all_constraints.table_name
            AND  all_cons_columns.constraint_name = all_constraints.constraint_name
            AND  all_cons_columns.column_name  = all_tab_columns.column_name
            AND   all_tab_columns.table_name LIKE '${table}'
            AND  all_constraints.constraint_name NOT LIKE '%SYS%'
            AND   all_constraints.OWNER = '${owner}'`
    },
}
