const mongoose = require('mongoose')

let IntegrationConfigSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Id do usuário deve ser preenchido.'],
            comment: 'Id do Usuário.',
        },
        integrationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'integration',
            required: [true, ' Id da integração deve ser preenchido'],
            unique: true,
            comment: "'Id da Integração.",
        },
        databaseType: {
            type: String,
            enum: {
                values: ['postgres', 'mysql', 'mariadb', 'oracledb', 'mongodb'],
                message: 'O valor não é suportado. {VALUE}.',
            },
            required: [true, 'O tipo do Banco deve ser preenchido.'],
            comment: 'Banco de Dados que será utilizado na conexão.',
        },
        querySettings: [
            {
                tableName: {
                    type: String,
                },
                relation: [],
                period: {
                    type: Object,
                },
                pk: {
                    type: String,
                },
                alias: {
                    type: String,
                },
                columns: [
                    {
                        columnName: {
                            type: String,
                        },
                        logicalOperation: {
                            operator: {
                                type: String,
                            },
                            valueParam: {
                                type: String,
                            },
                        },
                        customQuery: {
                            active: {
                                type: Boolean,
                                default: false,
                            },
                            subQuery: {
                                type: String,
                            },
                        },
                        dataType: {
                            type: String,
                        },
                        variations: {
                            groupBy: {
                                type: Boolean,
                                default: false,
                            },
                            orderBy: {
                                type: String,
                                enum: {
                                    values: ['asc', 'desc', null],
                                    message: `{VALUE} não é suportado.`,
                                },
                            },
                            count: {
                                type: Boolean,
                                default: false,
                            },
                            like: {
                                type: String,
                            },
                            notLike: {
                                type: String,
                            },
                            isNotNull: {
                                type: Boolean,
                                default: false,
                            },
                            denseRank: {
                                type: Boolean,
                                default: false,
                            },
                            innerJoin: {
                                type: Boolean,
                                default: false,
                            },
                            avg: {
                                type: Boolean,
                                default: false,
                            },
                            first: {
                                type: Boolean,
                                default: false,
                            },
                            last: {
                                type: Boolean,
                                default: false,
                            },
                            max: {
                                type: Boolean,
                                default: false,
                            },
                            min: {
                                type: Boolean,
                                default: false,
                            },
                            sum: {
                                type: Boolean,
                                default: false,
                            },
                            now: {
                                type: Boolean,
                                default: false,
                            },
                        },
                    },
                ],
            },
        ],
        connectionSettings: {
            uri: {
                type: String,
                comment: 'URI do MongoDB.',
            },
            username: {
                type: String,
                required: [true, 'User do banco de dados deve ser passado.'],
            },
            database: {
                type: String,
                required: [true, 'Nome do banco de dados deve ser passado.'],
            },
            password: {
                type: String,
                required: [true, 'Senha do banco de dados deve ser passado.'],
            },
            port: {
                type: String,
                required: [true, 'Porta de conexão para o banco de dados deve ser passado.'],
            },
            host: {
                type: String,
                required: [true, 'Host do banco de dados deve ser passado.'],
            },
            sid: {
                type: String,
            },
        },
        vpnSettings: {},
        active: {
            type: Boolean,
            default: true,
            comment: 'Status de configuração da Integração.',
        },
    },
    {versionKey: false},
)

IntegrationConfigSchema.set('timestamps', true)

module.exports = mongoose.model('integrationConfig', IntegrationConfigSchema)
