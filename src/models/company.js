const mongoose = require('mongoose')

let CompanySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome da empresa deve ser preenchido.'],
            unique: [true, 'Nome da empresa já cadastrado'],
            uppercase: true,
            comment: 'Nome da empresa.',
        },
        cnpj: {
            type: String,
            required: [true, 'CNPJ da empresa deve ser preenchido.'],
            unique: [true, 'CNPJ da empresa já cadastrado'],
            comment: 'CNPJ da empresa.',
        },
        corporate_name: {
            type: String,
            required: [true, 'A razão social da empresa não pode ser nula.'],
            unique: [true, 'A razão social da empresa já cadastrado'],
            uppercase: true,
            comment: 'A razão social da empresa da empresa.',
        },
        phone: {
            type: String,
            comment: 'Telefone da empresa.',
        },
        site_link: {
            type: String,
            comment: 'Site da empresa.',
        },
        address: {
            street: {
                type: String,
            },
            number: {
                type: String,
            },
            district: {
                type: String,
            },
            county: {
                type: String,
            },
            code: {
                type: String,
            },
        },
    },
    {versionKey: false},
)

CompanySchema.set('timestamps', true)

CompanySchema.path('name').validate(async (value) => {
    const nameExist = await mongoose.models.company.countDocuments({name: value})
    return !nameExist
}, 'O nome da empresa já está cadastrado.')

CompanySchema.path('corporate_name').validate(async (value) => {
    const corporateNameExist = await mongoose.models.company.countDocuments({corporate_name: value})
    return !corporateNameExist
}, 'Essa razão social já está cadastrada.')

module.exports = mongoose.model('company', CompanySchema)
