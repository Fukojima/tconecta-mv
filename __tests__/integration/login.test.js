// const request = require('supertest');
const app = require('../../src/index')
const server = require('../../src/config/server')
const supertest = require('supertest')
const request = supertest(app)
const User = require('../../src/models/user')
const {token} = require('../../src/controllers/AuthController')

describe ('Authentication', () => {
    beforeAll(async () => await server.connect())

    it('Authenticate with valid credentials. controller > service', async () => { 
        const response = await request.post('/api/connectivity/login')
        .send({
            email: "augustoqueiros@gmail.com",
            password: '12345'
        })
        expect(response.status).toBe(200)
    }),

    it('Authenticate with invalid credentials (password). controller > service', async () => {
        const response = await request.post("/api/connectivity/login")
        .send({
            email:"augustoqueiros@gmail.com",
            password: "000000"
        })
        expect(response.status).toBe(404)
    }),

    it('Authenticate with invalid credentials (email). controller > service', async () => {
        const response = await request.post("/api/connectivity/login")
        .send({
            email:"augustoqueiroszzzz@gmail.com",
            password: "12345"
        })
        expect(response.status).toBe(404)
    }),

    it('Verify token generation. controller > service', async () => {
        const response = await request.post('/api/connectivity/login')
        .send({
            email: "augustoqueiros@gmail.com",
            password: '12345'
        })
        expect(response.body.login.token).toBeDefined()
    }),

    it('Não deve ser possível logar sem email. controller > service', async () => {
        const response = await request.post('/api/connectivity/login')
        .send({
            password: '12345'
        })
        expect(response.status).toBe(400)
    }),

    it('Não deve ser possível logar sem senha. controller > service', async () => {
        const response = await request.post('/api/connectivity/login')
        .send({
            email: 'augustoqueiros@gmail.com'
        })
        expect(response.status).toBe(400)
    })
})