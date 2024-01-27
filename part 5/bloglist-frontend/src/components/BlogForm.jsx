import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
          title:<input
            id='title'
            type="text"
            value={title}
            name="title"
            placeholder='write title here...'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:<input
            id='author'
            type="text"
            value={author}
            name="author"
            placeholder='write author here...'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:<input
            id='url'
            type="text"
            value={url}
            name="url"
            placeholder='write url here...'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create-blog-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm