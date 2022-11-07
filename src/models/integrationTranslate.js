const mongoose = require('mongoose')

let IntegrationTranslateSchema = new mongoose.Schema(
    {
        integrationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'integration',
            required: [true, 'Id da integração deve ser preenchido.'],
            unique: true,
            comment: 'Id da Integração.',
        },
        fields: [
            {
                key: {
                    type: String,
                },

                translate: {
                    type: String,
                },
            },
        ],
    },
    {versionKey: false},
)

IntegrationTranslateSchema.set('timestamps', true)

IntegrationTranslateSchema.path('integrationId').validate(async (value) => {
    const integrationIdExist = await mongoose.models.integrationTranslate.countDocuments({integrationId: value})
    return !integrationIdExist
}, 'Esse integrationId já está cadastrado em um tradução.')

module.exports = mongoose.model('integrationTranslate', IntegrationTranslateSchema)
