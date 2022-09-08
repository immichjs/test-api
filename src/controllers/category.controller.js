const { Router } = require('express')
const router = Router()

const CategoryService = require('../services/category.service')

router.get('/categories', async (request, response) => {
  const { complete } = request.query

  const categories = await CategoryService.findAll(complete)
  return response.json(categories)
})

router.post('/category', async (request, response) => {
  try {
    const category = await CategoryService.createOne(request.body)
    return response.json(category)
  } catch ({ message }) {
    return response.status(400).json({ message })
  }
})

router.route('/category/:uuid')
  .get(async (request, response) => {
    const { uuid } = request.params
    const { complete } = request.query

    try {
      const category = await CategoryService.findOne(uuid, complete)
      return response.json(category)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .patch(async (request, response) => {
    const { uuid } = request.params
    try {
      const category = await CategoryService.updateOne(uuid, request.body)
      return response.json(category)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .delete(async (request, response) => {
    const { uuid } = request.params

    try {
      const message = await CategoryService.removeOne(uuid)
      return response.json(message)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })

module.exports = app => app.use(router)