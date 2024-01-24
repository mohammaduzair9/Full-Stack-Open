const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
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

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain(helper.initialBlogs[2].title)
  })

  test('unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    })
  })

})

describe('addition of a new blog', () => {
  test('succeeds with valid data', async () => {

    await api
      .post('/api/blogs')
      .send(helper.oneBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(helper.oneBlog.title)
    
  })

  test('with likes property missing defaults it to 0', async () => {

    const response = await api
      .post('/api/blogs')
      .send(helper.oneBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toEqual(0);
    
  })

  test('without title or url property fails with bad request', async () => {

    const testBlog = new Blog({
      author: helper.oneBlog.author,
      url: helper.oneBlog.url
    })

    await api
      .post('/api/blogs')
      .send(testBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})