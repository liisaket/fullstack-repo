const theRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Muistiinpanon luominen

theRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

theRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

theRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})


theRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const savedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true })

  response.status(201).json(savedBlog)
})


theRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = theRouter