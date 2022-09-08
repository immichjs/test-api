const { Router } = require('express')
const router = Router()

const OrderService = require('../services/order.service')

router.get('/orders', async (request, response) => {
  const orders = await OrderService.findAll()
  return response.json(orders)
})

router.post('/order', async (request, response) => {
  try {
    const order = await OrderService.createOne(request.body)
    return response.json(order)
  } catch ({ message }) {
    return response.status(400).json({ message })
  }
})

router.route('/order/:uuid')
  .get(async (request, response) => {
    const { uuid } = request.params

    try {
      const order = await OrderService.findOne(uuid)
      return response.json(order)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .patch(async (request, response) => {
    const { uuid } = request.params
    try {
      const order = await OrderService.updateOne(uuid, request.body)
      return response.json(order)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .delete(async (request, response) => {
    const { uuid } = request.params

    try {
      const message = await OrderService.removeOne(uuid)
      return response.json(message)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })

module.exports = app => app.use(router)