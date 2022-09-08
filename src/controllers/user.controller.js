const { Router } = require('express')
const userService = require('../services/user.service')
const router = Router()

const UserService = require('../services/user.service')

router.get('/users', async (request, response) => {
  const users = await UserService.findAll()
  return response.json(users)
})

router.post('/user', async (request, response) => {
  try {
    const user = await userService.createOne(request.body)
    return response.json(user)
  } catch ({ message }) {
    return response.status(400).json({ message })
  }
})

router.route('/user/:uuid')
  .get(async (request, response) => {
    const { uuid } = request.params

    try {
      const user = await UserService.findOne(uuid)
      return response.json(user)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .patch(async (request, response) => {
    const { uuid } = request.params
    try {
      const user = await userService.updateOne(uuid, request.body)
      return response.json(user)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })
  .delete(async (request, response) => {
    const { uuid } = request.params

    try {
      const message = await UserService.removeOne(uuid)
      return response.json(message)
    } catch ({ message }) {
      return response.status(400).json({ message })
    }
  })

module.exports = app => app.use(router)