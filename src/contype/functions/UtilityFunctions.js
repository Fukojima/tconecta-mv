module.exports = {
    getPeriod(data) {
        function hasLength(item) {
            if (item.period?.length) {
                return item.period
            }
        }

        let periodItem = data.filter(hasLength)
        let period = periodItem.map((item) => {
            return item.period
        })
        return period[0]
    },
    getColumns(data) {
        try {
            let columnName = data.map((item) => {
                const table = item.tableName
                return item.columns.map((col) => {
                    if (item.alias?.length > 0) {
                        return `\n${item.alias}.${col.columnName}`
                    } else {
                        return `\n${table}.${col.columnName}`
                    }
                })
            })
            // prevent undefineds elements
            if (columnName.length == 2) {
                return columnName[0].filter((element) => {
                    return element !== undefined
                })
            } else {
                return columnName.filter((element) => {
                    return element !== undefined
                })
            }
        } catch (error) {
            return {error: error.message}
        }
    },
    getVariations(data) {
        try {
            let variations = ''
            let groupBy = ''
            let orderBy = ''
            let hasGroupBy = false
            let col = data.map((item) => {
                let tableName
                if (item.alias.length > 0) {
                    tableName = item.alias
                } else {
                    tableName = item.tableName
                }

                for (let i = 0; item.columns.length > i; i++) {
                    for (const [key, value] of Object.entries(item.columns[i].variations)) {
                        if (key == 'groupBy' && value == true) {
                            hasGroupBy = true
                            groupBy += `, \n${tableName}.${item.columns[i].columnName}`
                        }
                        if (key == 'isNotNull' && value == true) {
                            variations += ` \nAND ${tableName}.${item.columns[i].columnName} IS NOT NULL `
                        }
                        if (key == 'notLike' && value?.length > 0) {
                            variations += ` \nAND ${tableName}.${item.columns[i].columnName} NOT LIKE ${value} `
                        }
                        if (key == 'like' && value?.length > 0) {
                            variations += ` \nAND ${tableName}.${item.columns[i].columnName} LIKE ${value} `
                        }
                        if (key == 'orderBy' && value?.length > 0) {
                            orderBy = ` \nORDER BY  ${tableName}.${item.columns[i].columnName} ${value.toUpperCase()}`
                        }
                    }

                    if (item.columns[i].customQuery.active) {
                        variations += `\nAND ${tableName}.${item.columns[i].columnName} = (${item.columns[i].customQuery?.subQuery})`
                    }

                    if (item.columns[i].logicalOperation?.operator?.length > 0) {
                        variations += `\nAND ${tableName}.${item.columns[i].columnName} ${item.columns[i].logicalOperation.operator} ${item.columns[i].logicalOperation.valueParam}`
                    }
                }
            })

            if (hasGroupBy) {
                groupBy = groupBy.substring(1)
                groupByQuery = ' \nGROUP BY'
                groupByQuery += groupBy

                variations += groupByQuery
            }

            variations += orderBy
            return variations
        } catch (error) {
            return {error: error.message}
        }
    },
    getTables(data) {
        try {
            let tableName = data.map((item) => {
                if (item.alias.length > 0) {
                    return `\n${item.tableName} ${item.alias}`
                } else {
                    return item.tableName
                }
            })
            return tableName
        } catch (error) {
            return {error: error.message}
        }
    },
    getRelations(data) {
        try {
            let relationArray = []
            const relation = data.map((item, index) => {
                if (item.alias.length > 0) {
                    for (let i = 0; i < item.relation.length; i++) {
                        let relationName = this.hasAlias(data, item.relation[i])
                        relationArray.push(`${item.alias}.${item.pk} = ${relationName}.${item.pk}`)
                    }
                } else {
                    for (let i = 0; i < item.relation.length; i++) {
                        let relationName = this.hasAlias(data, item.relation[i])
                        relationArray.push(`${item.tableName}.${item.pk} = ${relationName}.${item.pk}`)
                    }
                }
                return relationArray
            })
            return relation[0]
        } catch (error) {
            return {error: error.message}
        }
    },
    sanitizeCommas(data) {
        return data.toString().replaceAll(',', ' \nAND ')
    },
    renameKeys(obj, key, newKey) {
        let i
        for (i = 0; i < obj.length; i++) {
            obj[i][newKey] = obj[i][key]
            delete obj[i][key]
        }
    },
    hasAlias(data, tableName) {
        try {
            for (let i = 0; data.length > i; i++) {
                if (data[i].tableName == tableName) {
                    if (data[i].alias.length > 0) {
                        return data[i].alias
                    } else {
                        return tableName
                    }
                }
            }
        } catch (error) {
            return {error: error.message}
        }
    },
    isEmpty(body) {
        return (
            !body ||
            body === undefined ||
            body === null ||
            body === '' ||
            (body?.length !== undefined && body.length === 0) ||
            (typeof body === 'object' && Object.keys(body).length === 0)
        )
    },
    isUpperCase(text) {
        return text === text.toUpperCase() && text != text.toLowerCase()
    },
    toCamelCase(obj) {
        for (const [key] of Object.entries(obj)) {
            if (() => this.isUpperCase(key)) {
            }
        }
    },
}
