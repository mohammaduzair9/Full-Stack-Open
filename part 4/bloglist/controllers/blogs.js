const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  if (blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }
  else{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
    response.status(201).json(savedBlog)
  }
})

blogsRouter.put('/:id', async (request, response) => {

  const blog = request.body
  
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  )

  response.json(updatedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {

  const user = request.user

  const blog = await Blog.findById(request.params.id)
  userid = user.id

  if(blog.user.toString() === userid.toString()){
    await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
  }else{
    return response.status(401).json({ error: 'invalid user' })
  }
  
})

module.exports = blogsRouter