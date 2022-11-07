const mongoose = require('mongoose')

let IntegrationRegisterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome da integração deve ser preenchido.'],
            comment: 'Nome da Integração.',
        },
        description: {
            type: String,
            comment: 'Descrição da Integração.',
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: [true, 'Id do usuário deve ser preenchido.'],
            comment: 'Id do Usuário.',
        },
        integrationType: {
            type: String,
            enum: {
                values: ['api', 'database'],
                message: 'O valor não é suportado. {VALUE}.',
            },
            required: [true, 'O tipo da integração deve ser preenchido.'],
            comment: 'Tipo de integração que será realizada.',
        },
        endpoints: [
            {
                url: {
                    type: String,
                    required: [true, 'Necessário informar url de destino da integração.'],
                    comment: 'URL para onde será enviado dados da integração.',
                },
            },
        ],
        expiredAt: {
            type: Date,
            comment: 'Campo de expiração.',
        },
        trigger: {
            type: String,
            enum: {
                values: ['automatic', 'manual'],
                message: 'O valor não é suportado. {VALUE}.',
            },
            required: [true, 'O trigger da integração deve ser preenchido.'],
            comment: 'Campo para acionar a integração de forma manual ou automática.',
        },
        triggerInterval: {
            type: String,
            comment: 'Campo de intevalo da integração.',
        },
        registerInterval: {
            type: String,
            comment: 'Campo de registro de intervalo.',
        },
        integrationReport: {
            type: Boolean,
            default: false,
        },
        reportPeriod: {
            type: String,
            enum: {
                values: ['daily', 'weekly', 'monthly', null],
                message: 'O valor não é suportado. {VALUE}.',
            },
            comment: 'Campo de período da integração.',
        },
        reportEmail: {
            type: String,
            comment: 'E-mail para receber relatórios da integração.',
        },
        dynamicIntegrationType:{
           type: String,
        },
        autoRegister: {
            type: Boolean,
            default: false,
            comment: 'Campo de confirmação do auto-registro da integração.',
        },
    },
    {versionKey: false},
)

IntegrationRegisterSchema.set('timestamps', true)

module.exports = mongoose.model('integration', IntegrationRegisterSchema)
