const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  await api.post('/api/users').send(helper.initialUser)

  const response = await api
    .post('/api/login')
    .send({
      username: 'dan',
      password: 'sekret'
    })
  token = response.body.token

  const userId = (await User.findOne({}))._id

  const blogObjects = helper.initialBlogs
    .map(blog => {
      const b = new Blog(blog)
      b.user = userId
      return b
    })
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('the right number of blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = response.body
  expect(contents.length).toEqual(helper.initialBlogs.length)
})

test('the right number of users are returned as json', async () => {
  const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const contents = response.body
  expect(contents.length).toEqual(1)
})

test('the id field is present', async () => {
  const blogsInDb = await helper.blogsInDb()
  const blogToView = blogsInDb[0]

  const response = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
  const contents = response.body
  expect(contents.id).toBeDefined()
})

describe('Delete a Blog', () => {
  test('a users own blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const urls = blogsAtEnd.map(r => r.url)

    expect(urls).not.toContain(blogToDelete.url)
  })

  test('a blog cant be deleted wo auth', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })
})

describe('Create New Blog', () => {
  test('a blog can be created', async () => {
    const newBlog = {
      title: 'This is a blog, yo!',
      author: 'John Q. Blogger',
      url: 'http://example.com/blog',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const urls = blogsAtEnd.map(x => x.url)
    expect(urls).toContain('http://example.com/blog')
  })

  test('likes default to zero', async () => {
    const newBlog = {
      title: 'This is a blog, yo!',
      author: 'John Q. Blogger',
      url: 'http://example.com/blog',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(200)

    const insertedBlog = await helper.blogByUrl(newBlog.url)
    expect(insertedBlog.likes).toEqual(0)
  })

  test('title is required', async () => {
    const newBlog = {
      author: 'John Q. Blogger',
      url: 'http://example.com/blog',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('url is required', async () => {
    const newBlog = {
      title: 'This is a blog, yo!',
      author: 'John Q. Blogger'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})




afterAll(() => {
  mongoose.connection.close()
})