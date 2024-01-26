import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  let container

  const testBlog = {
    title: 'my test blog',
    author: 'i am the author',
    url: 'www.testblog.com',
    likes: 1,
    user: '12345abcd'
  }

  const testUser = {
    username: 'username',
    name: 'name',
    token: 'mytesttoken'
  }


  test('blog title and author rendered by default, but URL or likes not rendered by default', () => {

    container = render(
      <Blog user={ testUser } blog={ testBlog } addLike={ () => null } deleteBlog={ () => null } />
    ).container

    const div1 = container.querySelector('.defaultblogDetail')
    expect(div1).not.toHaveStyle('display: none')

    const div2 = container.querySelector('.hiddenblogDetail')
    expect(div2).toHaveStyle('display: none')

  })

  test('URL and likes are shown when button controlling the shown details has been clicked', async () => {

    container = render(
      <Blog user={ testUser } blog={ testBlog } addLike={ () => null } deleteBlog={ () => null } />
    ).container

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.hiddenblogDetail')
    expect(div).not.toHaveStyle('display: none')

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

    const mockHandler = jest.fn()

    container = render(
      <Blog user={ testUser } blog={ testBlog } addLike={ mockHandler } deleteBlog={ () => null } />
    ).container

    const user = userEvent.setup()
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })

})