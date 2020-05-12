const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.password.length < 3) {
    logger.error('password must be 3 characters or longer')
    return response.status(400).json({ error: 'password must be 3 characters or longer' }).end()
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id).populate('blogs', { title: 1, author: 1, likes: 1, url:1 })
  if (user) {
    response.json(user.toJSON())
  } else {
    response.status(404).end()
  }
})

module.exports = usersRouter