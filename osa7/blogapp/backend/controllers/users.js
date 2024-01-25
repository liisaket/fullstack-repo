const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1, user: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  const taken = await User.findOne({ username })

  if (password.length < 3 && username.length < 3) {
    return response.status(400).json({
      error: 'username and password are shorter than the minimum allowed length (3).'
    })
  } else if (password.length < 3) {
    return response.status(400).json({
      error: 'password is shorter than the minimum allowed length (3).'
    })
  } else if (username.length < 3) {
    return response.status(400).json({
      error: 'username is shorter than the minimum allowed length (3).'
    })
  } else if (name.length < 3) {
    return response.status(400).json({
      error: 'name is shorter than the minimum allowed length (3).'
    })
  } else if (taken) {
    return response.status(400).json({
      error: `username "${username}" is already taken.`
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter