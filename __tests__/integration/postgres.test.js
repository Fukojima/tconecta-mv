const app = require('../../src/index')
const supertest = require('supertest')
const request = supertest(app)
const server = require('../../src/config/server')

describe('Expected answers from Postgres', () => {
    beforeAll(async () => await server.connect())
    const token = process.env.TEST_TOKEN

    it('Should connect with postgres', async () => {
        const response = await request.post("/api/connectivity/postgres")
        .set('Authorization', `Bearer ${token}`) 
        .send({
            database: "aps-dev",
            username: "tasconecta",
            password: "tasconectapass",
            host: "34.151.215.24",
            port: "5432"
        })
        expect(response.status).toBe(200)
    })
})
