const express = require('express')
const mockingRouter = express.Router()
const generateProduct = require("../utils/generateProducts")

mockingRouter.get('/', async (req, res) => {
    let products = []
    for (let i = 0; i < 100; i++) {
        products.push(generateProduct())
    }
    res.send({status: 'ok', payload:products})
})

module.exports = mockingRouter