const PdfPrinter = require('pdfmake')
const fs = require('fs')
const path = require('path')
const Integration = require('../models/integration')
const {DateTime} = require('luxon')
const responseMessages = require('../models/responseMessages')

module.exports = {
    async report(request, response) {
        const userId = req.body
        try {
            const integrations = await Integration.find().lean()
            const fonts = {
                Helvetica: {
                    normal: 'Helvetica',
                    bold: 'Helvetica-Bold',
                    italics: 'Helvetica-Oblique',
                    bolditalics: 'Helvetica-BoldOblique',
                },
            }

            const contentIntegration = []

            integrations.map((integration) => {
                delete integration.__v
                const createAtFormat = (integration.createdAt = DateTime.fromJSDate(integration.createdAt).toFormat(
                    "dd/MM/yyyy 'às' HH:mm:ss",
                ))
                integration.updateAt = DateTime.fromJSDate(integration.updateAt).toFormat("dd/MM/yyyy 'às' HH:mm:ss")
                const integrationKeys = Object.keys(integration)
                const integrationValues = Object.values(integration)

                integrationKeys.map((key, index) => {
                    return [{text: `${key}`}, {text: `${integrationValues[index]}`}]
                })

                contentIntegration.push(
                    {
                        stack: [
                            {
                                text: `${integration.name}`,
                                style: 'header',
                                margin: [0, 30, 0, 0],
                            },
                            {
                                text: `Integração emitida em: ${createAtFormat}`,
                                style: 'header',
                                margin: [0, 5, 0, 10],
                            },
                        ],
                    },
                    {
                        style: 'table',
                        color: '#303030',
                        table: {
                            body: [
                                ...integrationKeys.map((key, index) => [
                                    {text: `${key}`},
                                    {text: `${integrationValues[index]}`},
                                ]),
                            ],
                            widths: ['*', '*'],
                        },
                        layout: {
                            fillColor: function (rowIndex, node, columnIndex) {
                                return rowIndex % 2 === 0 ? '#E9EFFC' : null
                            },
                            hLineWidth: function (i, node) {
                                return i === 0 || i === node.table.body.length ? 0.5 : 0.5
                            },
                            vLineWidth: function (i, node) {
                                return i === 0 || i === node.table.widths.length ? 0.5 : 0.5
                            },
                            hLineColor: function (i, node) {
                                return '#c4c4c4'
                            },
                            vLineColor: function (i, node) {
                                return '#c4c4c4'
                            },
                            paddingBottom: function (i, node) {
                                return 7
                            },
                            paddingTop: function (i, node) {
                                return 7
                            },
                        },
                    },
                )
            })

            const printer = new PdfPrinter(fonts)

            const docDefinitions = {
                defaultStyle: {font: 'Helvetica', fontSize: 10, columnGap: 20, alignment: 'justify'},
                pageSize: 'A4',
                pageOrientation: 'portrait',
                pageMargins: [40, 120, 40, 40],
                background: {
                    canvas: [{type: 'rect', x: 20, y: 20, w: 555, h: 800, r: 5, lineWidth: 1, lineColor: '#667180'}],
                },

                info: {
                    title: 'Tasconecta - Relatório da Integração',
                    author: 'Tascom Tecnologia',
                    keywords: 'integration, connectivity',
                },

                content: contentIntegration,
                header: function (currentPage, pageCount) {
                    if (currentPage !== -1) {
                        return {
                            margin: [40, 40, 0, 50],
                            stack: [
                                {
                                    table: {
                                        widths: [200, 300],
                                        heights: [65, 65],
                                        body: [
                                            [
                                                {
                                                    image: fs.readFileSync(path.join(__dirname, '\\logotscnecta.jpg')),
                                                    opacity: 1,
                                                    width: 150,
                                                    absolutePosition: {x: 65, y: 60},
                                                },
                                                {
                                                    stack: [
                                                        {
                                                            text: 'Relatório de dados da Integração',
                                                            style: 'headerPage',
                                                            bold: true,
                                                        },
                                                        {
                                                            text: `Página: ${currentPage}/${pageCount}`,
                                                            style: 'headerPage',
                                                        },
                                                        {
                                                            text: `Página: ${currentPage}/${pageCount}`,
                                                            style: 'headerPage',
                                                        },
                                                        {
                                                            text: `Relatório gerado em:\n\n ${DateTime.now().toFormat(
                                                                "\ndd/MM/yyyy 'às' HH:mm:ss",
                                                            )}`,
                                                            style: 'headerPage',
                                                        },
                                                    ],
                                                },
                                            ],
                                        ],
                                    },
                                    layout: {
                                        hLineWidth: function (i, node) {
                                            return i === 0 || i === node.table.body.length ? 0.5 : 0.5
                                        },
                                        vLineWidth: function (i, node) {
                                            return i === 0 || i === node.table.widths.length ? 0.5 : 0.5
                                        },
                                        hLineColor: function (i, node) {
                                            return '#667180'
                                        },
                                        vLineColor: function (i, node) {
                                            return '#667180'
                                        },
                                    },
                                },
                            ],
                        }
                    }
                },
                footer: function (currentPage, pageCount) {
                    if (currentPage !== -1) {
                        return {
                            margin: [40, -10],
                            stack: [
                                {
                                    canvas: [
                                        {
                                            type: 'line',
                                            x1: 0,
                                            y1: 0,
                                            x2: 515,
                                            y2: 0,
                                            lineWidth: 0.7,
                                            lineColor: '#667180',
                                        },
                                    ],
                                },
                                {
                                    table: {
                                        headerRows: 1,
                                        body: [
                                            [
                                                {
                                                    image: fs.readFileSync(path.join(__dirname, '\\logotascom.jpg')),
                                                    opacity: 1,
                                                    width: 70,
                                                },
                                                {
                                                    stack: [
                                                        {
                                                            text: 'INOVAÇÃO TECNOLÓGICA NA GESTÃO HOSPITALAR',
                                                            style: ['quote', 'small'],
                                                        },
                                                        {
                                                            text: `CNPJ: 06.312.868/0001-03       Contato: (81) 3030-7073`,
                                                            style: ['quote', 'small'],
                                                        },
                                                    ],
                                                },
                                            ],
                                        ],
                                    },
                                    layout: 'headerLineOnly',
                                },
                            ],
                        }
                    }
                },
                styles: {
                    header: {
                        fontSize: 10,
                        bold: true,
                        color: '#303030',
                        alignment: 'left',
                        margin: [50, 20, 0, 0],
                    },
                    headerPage: {
                        fontSize: 10,
                        lineHeight: 0.6,
                        color: '#303030',
                        margin: [0, 6, 0, 6],
                    },
                    quote: {
                        italics: true,
                    },
                    small: {
                        fontSize: 7,
                        lineHeight: 1.3,
                    },
                },
            }

            const chunks = []
            const pdfDoc = printer.createPdfKitDocument(docDefinitions)
            pdfDoc.pipe(fs.createWriteStream('TSCM - Relatório Tasconecta.pdf'))

            pdfDoc.on('data', (chunk) => {
                chunks.push(chunk)
            })
            pdfDoc.end()

            pdfDoc.on('end', () => {
                const result = Buffer.concat(chunks)
                response.contentType('application/pdf')
                response.end(result)
            })
        } catch (error) {
            return res.status(500).json(responseMessages._ERROR_CREATE_REPORT)
        }
    },
}
