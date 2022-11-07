const mongoose = require('mongoose')

let IntegrationReportSchema = new mongoose.Schema(
    {
        integrationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'integration',
            required: [true, 'Id da integração deve ser preenchido.'],
            unique: true,
            comment: 'Id da Integração.',
        },
        success: {
            type: Boolean,
            default: true,
            required: [true, 'Necessário saber status da integração.'],
            comment: 'Status de falha ou sucesso da integração.',
        },
        errorMessage: {
            type: String,
            comment: 'Caso processo de integração for falho, apresentar mensagem de erro.',
        },
        report: {},
    },
    {versionKey: false},
)

IntegrationReportSchema.set('timestamps', true)

module.exports = mongoose.model('integrationReport', IntegrationReportSchema)
