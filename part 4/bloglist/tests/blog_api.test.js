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

    expect(response.body.likes).toEqual(0)
    
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

describe('updation of a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {

    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const testBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100 
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(testBlog)  
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length 
    )

    expect(response.body.likes).toEqual(testBlog.likes)
  })

  test('fails with bad request if id is invalid', async () => {
    
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const testBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: 100 
    }

    const response = await api
      .put(`/api/blogs/${helper.oneBlog.id}`)
      .send(testBlog)  
      .expect(400)

  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.titles)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})