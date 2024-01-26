import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ user, blog, addLike, deleteBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleAddLike = () => {

    const blogObject = { ...blog, likes:blog.likes+1 }
    addLike(blog.id, blogObject)
  }

  const handleDeleteBlog = () => {
    if (window.confirm(`Remove "${blog.title}" by ${blog.author} ?`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='defaultblogDetail'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='hiddenblogDetail'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>hide</button>
        </div>
        <div>
          {blog.url} <br/>
          {blog.likes}<button onClick={handleAddLike}>like</button> <br/>
          {blog.user.name} <br/>
          {blog.user.username === user.username && <button onClick={handleDeleteBlog}>remove</button>}
        </div>
      </div>

    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog