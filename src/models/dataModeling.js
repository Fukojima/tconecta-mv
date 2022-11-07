const mongoose = require('mongoose')

let DataModelingSchema = new mongoose.Schema(
    {
        integrationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'integration',
            required: [true, 'Id da integração deve ser preenchido.'],
            unique: true,
            comment: 'Id da Integração.',
        },
        model: {},
    },
    {versionKey: false},
)

DataModelingSchema.set('timestamps', true)

module.exports = mongoose.model('dataModeling', DataModelingSchema)
