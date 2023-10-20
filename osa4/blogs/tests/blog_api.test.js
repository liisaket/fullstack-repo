const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('there is an id field', async () => {
    const blogs = await helper.blogsInDb()
    const blogToCheck = blogs[0]
    expect(blogToCheck.id).toBeDefined()
  })

  test('there is a specific blog', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })

  describe('viewing a specific blog', () => {

    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(blogToView)
    })

    test('fails with 404 if blog does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(400)
    })
  })

  describe('add/delete/edit a blog', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()

      const userInfo = { username: 'root', password: 'sekret' }

      result = await api
        .post('/api/login')
        .send(userInfo)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      token = result.body.token
    })

    test('adding a blog succeeds with valid data', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.title)
      const users = blogsAtEnd.map(n => n.user)
      expect(contents).toContain(
        'Canonical string reduction'
      )
      expect(users).toContain(
        result.body._id
      )
    })

    test('when adding a blog, if likes-field is not defined, likes are 0', async () => {
      const newBlog = {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(n => n.likes)
      expect(contents).toContain(
        0
      )
    })

    test('adding fails with 400 if title/url is missing', async () => {
      const newBlog = {
        author: 'Edsger W. Dijkstra',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
      // Blog validation failed: title: Path `title` is required., url: Path `url` is required.
      // Works if either one or both are missing.

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('adding a new blog fails with 401 if token is missing', async () => {
      const newBlog = {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).not.toContain(
        'Canonical string reduction'
      )
    })

    test('deleting a blog succeeds with 204', async () => {
      const testBlog = {
        title: 'Test blog',
        author: 'Tester',
        url: 'http://www.cs.utexas.edu/'
      }

      const blogToDelete = await api
        .post('/api/blogs')
        .send(testBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsCurrently = await helper.blogsInDb()
      expect(blogsCurrently).toHaveLength(
        helper.initialBlogs.length + 1
      )

      await api
        .delete(`/api/blogs/${blogToDelete.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length
      )

      const contents = blogsAtEnd.map(r => r.title)
      expect(contents).not.toContain(blogToDelete.body.title)
    })

    test('a blog info can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const wantedBlog = { id: blogToUpdate.id,
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 10,
      }

      const resultBlog = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({ likes: 10 })
        .expect(201)
        .expect('Content-Type', /application\/json/)

      expect(resultBlog.body).toEqual(wantedBlog)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

      expect(blogsAtEnd[0]).toEqual(wantedBlog)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})