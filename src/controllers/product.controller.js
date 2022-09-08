const { Router } = require('express')
const router = Router()

const ProductService = require('../services/product.service')

router.get('/products', async (request, response) => {
  const { complete } = request.query

  const products = await ProductService.findAll(complete)
  return response.json(products)
})

router.post('/product', async (request, response) => {
  try {
    const product = await ProductService.createOne(request.body)
    return response.json(product)
  } catch ({ message }) {
    return response.status(400).json({ message })
  }
})

router.route('/product/:uuid')
  .get(async (request, response) => {
    const { uuid } = request.params
    const { complete } = request.query

    try {
      const product = await ProductService.findOne(uuid, complete)
      return response.json(product)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .patch(async (request, response) => {
    const { uuid } = request.params
    try {
      const product = await ProductService.updateOne(uuid, request.body)
      return response.json(product)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .delete(async (request, response) => {
    const { uuid } = request.params

    try {
      const message = await ProductService.removeOne(uuid)
      return response.json(message)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })

module.exports = app => app.use(router)