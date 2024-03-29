import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notiification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [eventSuccess, setEventSuccess] = useState(true)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs.sort((a, b) => b.likes - a.likes))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      getBlogs()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      getBlogs()
      setEventSuccess(true)
    }
    catch (exception) {
      setNotification('wrong username or password')
      setEventSuccess(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.createBlog(blogObject)
      const returnedBlogUser = {
        username: user.username,
        name: user.name,
        id: returnedBlog.user
      }
      const newBlogWithUser = { ...returnedBlog, user: returnedBlogUser }
      setBlogs(blogs.concat(newBlogWithUser))
      setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setEventSuccess(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Blog could not be created')
      setEventSuccess(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleAddLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.addLike(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...blog, likes: returnedBlog.likes }))
      getBlogs()
      setEventSuccess(true)
    }
    catch (exception) {
      setNotification('Blog could not be liked')
      setEventSuccess(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async id => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setNotification('removed blog successfully')
      setEventSuccess(true)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch (exception) {
      setNotification('Blog could not be removed')
      setEventSuccess(false)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username<input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password<input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

  const blogLists = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} addLike={handleAddLike} deleteBlog={handleDeleteBlog} />
      )}
    </div>
  )

  return (
    <div>
      <Notification message={notification} success={eventSuccess}/>
      {!user && loginForm()}
      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in
            <button type="submit" onClick={handleLogout}>logout</button>
          </p>
          {createBlogForm()}
          {blogLists()}
        </div>
      )}
    </div>
  )
}

export default App