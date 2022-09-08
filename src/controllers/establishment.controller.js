const { Router } = require('express')
const router = Router()

const EstablishmentService = require('../services/establishment.service')

router.get('/establishments', async (request, response) => {
  const establishments = await EstablishmentService.findAll()
  return response.json(establishments)
})

router.post('/establishment', async (request, response) => {
  try {
    const establishment = await EstablishmentService.createOne(request.body)
    return response.json(establishment)
  } catch ({ message }) {
    return response.status(400).json({ message })
  }
})

router.route('/establishment/:uuid')
  .get(async (request, response) => {
    const { uuid } = request.params

    try {
      const user = await EstablishmentService.findOne(uuid)
      return response.json(user)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .patch(async (request, response) => {
    const { uuid } = request.params
    try {
      const establishment = await EstablishmentService.updateOne(uuid, request.body)
      return response.json(establishment)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .delete(async (request, response) => {
    const { uuid } = request.params

    try {
      const message = await EstablishmentService.removeOne(uuid)
      return response.json(message)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })

module.exports = app => app.use(router)