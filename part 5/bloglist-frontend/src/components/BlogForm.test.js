import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

test('the form calls the event handler it received as props with the right details when a new blog is created', async () => {

  const testBlog = {
    title: 'my test blog',
    author: 'i am the author',
    url: 'www.testblog.com',
  }

  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const user = userEvent.setup()

  const blogTitleTextInput = screen.getByPlaceholderText('write title here...')
  const blogAuthorTextInput = screen.getByPlaceholderText('write author here...')
  const blogUrlTextInput = screen.getByPlaceholderText('write url here...')
  const sendButton = screen.getByText('create')

  await user.type(blogTitleTextInput, testBlog.title)
  await user.type(blogAuthorTextInput, testBlog.author)
  await user.type(blogUrlTextInput, testBlog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)

  expect(createBlog.mock.calls[0][0].title).toBe(testBlog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(testBlog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(testBlog.url)

})