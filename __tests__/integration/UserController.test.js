const app = require('../../src/index')
const server = require('../../src/config/server')
const supertest = require('supertest')
const request = supertest(app)
const User = require('../../src/models/user')

describe('Expected answers from UserController', () => {

    beforeAll(async () => await server.connect())
    const token = process.env.TEST_TOKEN
    
    // create tests

    it('Should create an user', async () => {
    const response = await request.post('/api/connectivity/users')
    .set('Authorization', `Bearer ${token}`)
    .send({
        name: "Usuario de Teste",
        email: "teste@gmail.com",
        password: "12345",
        company: "6286d8f6b9673278997ba7d6",
        grant: "leitura"
    })
    expect(response.status).toBe(201)

    const user = await User.findOne({ email: 'teste@gmail.com' })
    await User.deleteOne(user)
    }),

    it('Should not create an already existing user', async () => {
        const response = await request.post('/api/connectivity/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Augusto Queiroz",
            email: "augustoqueiros@gmail.com",
            password: "12345",
            grant: "leitura",
            company: "6286d8f6b9673278997ba7d6"
        })
        expect(response.status).toBe(500)
    }),

    it('Não deve ser possível criar um usuário com corpo vazio. (notEmptyBody) controller > service > validations ', async () => {
        const response = await request.post('/api/connectivity/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            
        })
        expect(response.status).toBe(400)
    }),

    it('Não deve ser possível cadastrar um usuário com company inexistente. (companyExist) controller > service > validations ', async () => {
        const response = await request.post('/api/connectivity/users')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Usuario de Teste",
            email: "teste@gmail.com",
            password: "12345",
            company: "631b8bba00c44b3373092c96",
            grant: "leitura"
        })
        expect(response.status).toBe(404)

    }),

    // show tests

    it('show user test. Controller > Service', async () => {
        const response = await request.get('/api/connectivity/users/6308c2b706a3ac967e92fabc')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    }),

    // Update tests

    it('Deve ser possível editar um usuário. Controller > Service', async () => {
        const response = await request.put('/api/connectivity/users/631f3a27f26054508b344bea')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Novo Nome de Teste Update",
            email: "updatenovo@gmail.com",
            password: "12345",
            company: "631f3786f26054508b344be1",
            grant: "leitura"   
        })
        expect(response.status).toBe(200)

        await User.findByIdAndUpdate('631f3a27f26054508b344bea', 
        { 
            name: "Usuario de Teste Update",
            email: "update@gmail.com",
            password: "12345",
            company: "6286d8f6b9673278997ba7d6",
            grant: "leitura"    
        })
    }),
    
    it('Não deve ser possível editar um id inválido. (userExist) Controller > Service > Validations', async () => {
        const response = await request.put('/api/connectivity/users/631f44f29b91cdc211b1d711')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Novo Nome de Teste Update",
            email: "updatenovo@gmail.com",
            password: "12345",
            company: "631f3786f26054508b344be1",
            grant: "leitura"   
        })
        expect(response.status).toBe(404)
    }),

    it('Não deve ser possível alterar para um id inválido a company. (companyExist) Controller > Service > Validations', async () => {
        const response = await request.put('/api/connectivity/users/6308c2b706a3ac967e92fabc')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Novo Nome de Teste Update",
            email: "updatenovo@gmail.com",
            password: "12345",
            company: "631f486c49bbc20e37df9bf2",
            grant: "leitura"   
        })
        expect(response.status).toBe(404)
    }),

    it(' Update teste de corpo vazio. (notEmptyBody) Controller > Service > Validations', async () => {
        const response = await request.put('/api/connectivity/users/6308c2b706a3ac967e92fabc')
        .set('Authorization', `Bearer ${token}`)
        .send({
        
        })
        expect(response.status).toBe(404)
    })
})

