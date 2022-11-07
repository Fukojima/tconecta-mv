const mongoose = require('mongoose')

module.exports = {
    async getAllCollections(req, res) {
        try {
            let body = req.body
            await mongoose.createConnection(body.uri)

            mongoose.connection.db.listCollections().toArray(function (error, names) {
                if (error) return error.message
                let collections = []
                names.forEach((elem) => {
                    collections.push({collection: elem.name})
                })
                return res.json(collections)
            })
        } catch (error) {
            console.log(error.message)
            return res.status(500).json({
                error: 'Não foi possível consultar coleções',
                errorDescribe: error.message,
            })
        }
    },
    async getAllFields(req, res) {
        try {
            let body = req.body
            let {collections} = req.body
            let result_final = []

            collections.forEach((e) => {
                result_final.push({collection: e, fields: []})
            })

            await mongoose.connect(body.uri)

            for (let i = 0; i < collections.length; i++) {
                const keysFields = Object.keys(
                    await mongoose.model(collections[i]).findOne().select({_id: 0, __v: 0}).lean(),
                )
                for (let j = 0; j < result_final.length; j++) {
                    if (result_final[j].collection == collections[i]) {
                        result_final[j].fields = keysFields
                    }
                }
            }

            return res.send(result_final)
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                error: 'Não foi possível consultar os campos da coleção',
                errorDescribe: error.message,
            })
        }
    },
}
