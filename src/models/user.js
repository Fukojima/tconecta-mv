const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

let UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Nome de Usuário deve ser preenchido.'],
            comment: 'Campo de nome de usúario.',
        },
        email: {
            type: String,
            required: [true, 'O e-mail do usuário deve ser preenchido.'],
            unique: [true],
            comment: 'Campo de e-mail do usuário.',
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /55[\d]{2}[\d]{8}$/.test(v)
                },
                message: (props) => `${props.value} não é um número válido!`,
            },
            comment: 'Campo para registrar celular do usuário.',
        },
        notify: {
            type: Boolean,
            default: false,
            comment: 'Campo de confirmação de notificação da integração pelo celular.',
        },
        password: {
            type: String,
            // min: [8, 'A senha deve conter no mínimo 8 dígitos, contém: {VALUE}'],
            // max: 10,
            required: [true, 'Senha deve ser preenchida.'],
            comment: 'Campo de senha do usuário.',
        },
        company: {
            type: String,
            ref: 'company',
            required: [true, 'Id da Empresa deve ser preenchido.'],
            comment: 'Nome da empresa que o usuário trabalha.',
        },
        refreshToken: {
            type: String,
            comment: 'Token de acesso.',
        },
        lastAccess: {
            type: Date,
            default: Date.now,
            comment: 'Data do último acesso do usuário.',
        },
        active: {
            type: Boolean,
            default: true,
            comment: 'Campo de Status para saber se usuário está ativo.',
        },
        grant: {
            type: String,
            enum: {
                values: ['leitura', 'leitura/escrita'],
                message: `{VALUE} não é suportado.`,
            },
            required: [true, 'Necessário passar a permissão do usuário'],
            comment: 'Campo de permissões de usuário.',
        },
    },
    {versionKey: false},
)

UserSchema.set('timestamps', true)

UserSchema.path('email').validate(async (value) => {
    const emailExist = await mongoose.models.user.countDocuments({email: value})
    return !emailExist
}, 'Esse e-mail já está cadastrado.')

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

module.exports = mongoose.model('user', UserSchema)
