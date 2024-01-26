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

  beforeEach(() => {
    container = render(
      <Blog user={ testUser } blog={ testBlog } addLike={ () => null } deleteBlog={ () => null } />
    ).container
  })

  test('blog title and author rendered by default, but URL or likes not rendered by default', () => {

    const div1 = container.querySelector('.defaultblogDetail')
    expect(div1).not.toHaveStyle('display: none')

    const div2 = container.querySelector('.hiddenblogDetail')
    expect(div2).toHaveStyle('display: none')

  })

  test('URL and likes are shown when button controlling the shown details has been clicked', async () => {

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const div = container.querySelector('.hiddenblogDetail')
    expect(div).not.toHaveStyle('display: none')

  })

})