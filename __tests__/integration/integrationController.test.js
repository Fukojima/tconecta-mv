const app = require('../../src/index')
const server = require('../../src/config/server')
const supertest = require('supertest')
const request = supertest(app)
const Integration = require('../../src/models/integration')

describe('Expected answer from IntegrationController', () => {
    beforeAll(async () => await server.connect(),
        beforeAll(() => jest.setTimeout(90 * 1000)))
    const token = process.env.TEST_TOKEN

    // Create tests

    it('Should create an integration', async () => {
        const response = await request.post('/api/connectivity/integrations')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Teste Saúde 02",
            description: "Teste acima dos 30 anos",
            integrationType: "api",
            endpoints: [{url:"http://testesaude02/api/teste"}],
            triggerInterval: "2",
            integrationReport: true,
            period: "monthy",
            active: true,
            expiredAt: "2022-10-20",
            autoRegister: false
        })
        expect(response.status).toBe(201)

        const integration = await Integration.findOne({ name: 'Teste Saúde 02' })
        await Integration.deleteOne(integration)
    }),

    it('Não deve ser possível criar uma integração com corpo vazio. (notEmptyBody) controller > service > validations', async () => {
        const response = await request.post('/api/connectivity/integrations')
        .set('Authorization', `Bearer ${token}`)
        .send({

        })
        expect(response.status).toBe(400)
    }),

    it('Não deve ser possível criar duas integrações com mesmo nome para um usuário. (nameIntegrationExist) controller > service > validations', async () => {
        const response = await request.post('/api/connectivity/integrations')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Memento Mori",
            description: "Exevo gran mas tera",
            integrationType: "api",
            triggerInterval: "2",
            integrationReport: true,
            period: "monthy",
            active: true,
            expiredAt: "2022-10-20",
            autoRegister: false
        })
        expect(response.status).toBe(500)
    }),

    // Show oneIntegrations tests

    it('Deve ser possível consultar a interação', async () => {
        const response = await request.get('/api/connectivity/integrations/630cb3f9a8d66bd4b05c20d2')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    }),

    it('Não deve ser possível consultar a interação com id inválido. (integrationExist) Controller > Service > Validation', async () => {
        const response = await request.get('/api/connectivity/integrations/631f79ef0bcbf25fdb1a9bee')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(404)
    }),

    // verificar necessidade do teste para showOne integration com validation userExist

    // Show AllIntegrations

    it('Deve ser possível consultar todas as integrações', async () => {
        const response = await request.get('/api/connectivity/integrations/user/current')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
})
