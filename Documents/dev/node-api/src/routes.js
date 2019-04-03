const express = require('express')
const routes = express.Router()

// Controllers
const Product = require('./controllers/ProductController')

routes.get('/products', Product.index)
routes.post('/products', Product.create)
routes.get('/products/:id', Product.show)
routes.put('/products/:id', Product.update)

module.exports = routes