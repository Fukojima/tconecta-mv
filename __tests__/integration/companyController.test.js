const app = require('../../src/index')
const server = require('../../src/config/server')
const supertest = require('supertest')
const request = supertest(app)
const Company = require('../../src/models/company')

describe('Expected answer from CompanyController', () => {
	beforeAll(async () => await server.connect())
	const token = process.env.TEST_TOKEN

	// Create tests

	it('Should create a company', async () => {
		const response = await request.post('/api/connectivity/companies')
		.set('Authorization', `Bearer ${token}`)
		.send({
			name: "Empresa de testes",
			cnpj: "98.660.537/0001-82",
			corporate_name: "Testesss",
			phone: "3377-3210",
			site_link: "https://www.empresatestes.com.br/",
			address: {
				street: "Avenida Conselheiro Aguiar",
				number: "125",
				district: "Boa Viagem",
				county: "Recife",
				code: "52350-223"
			}
		})
		expect(response.status).toBe(201)
		await Company.findOneAndDelete({ name: 'Empresa de testes' })
	}),

	it('Não deve ser possível criar uma company com corpo vazio. (notEmptyBody) Controller > Service > validations', async () => {
		const response = await request.post('/api/connectivity/companies')
		.set('Authorization', `Bearer ${token}`)
		.send({

		})
		expect(response.status).toBe(400)
	}),

	// Show tests

	it('Show test. Controller', async () => {
		const response = await request.get('/api/connectivity/companies/6286d8f6b9673278997ba7d6')
		.set('Authorization', `Bearer ${token}`)
		
		expect(response.status).toBe(200)
	}),
	
	it('Show test, não deve ter possível visualizar Company com id inválido. Controller > Service > Validations', async () => {
		const response = await request.get('/api/connectivity/companies/631f720bcbb155a5dc8db809')
		.set('Authorization', `Bearer ${token}`)
		
		expect(response.status).toBe(404)
	}),

	// Update tests

	it('Deve ser possível editar uma company.', async () => {
		const response = await request.put('/api/connectivity/companies/631f6891f8d35569b819c63b')
		.set('Authorization', `Bearer ${token}`)
		.send({
			corporate_name: "Novo Nome Update Teste"
		})	
		expect(response.status).toBe(200)

		await Company.findByIdAndUpdate('631f6891f8d35569b819c63b', 
        { 
            corporate_name: "Nome Update Teste"   
        })
	}),

	it('Não deve ser possível editar a company sem um body. (notEmptyBody) Controller > Service > Validations', async () => {
		const response = await request.put('/api/connectivity/companies/631f6891f8d35569b819c63b')
		.set('Authorization', `Bearer ${token}`)
		.send({
			
		})
		expect(response.status).toBe(400)
	})
})
