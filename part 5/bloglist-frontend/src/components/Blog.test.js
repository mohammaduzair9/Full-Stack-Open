import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog title and author rendered by default, bit URL or likes not rendered by default', () => {

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

  const container = render(
    <Blog user={ testUser } blog={ testBlog } addLike={ () => null } deleteBlog={ () => null } />
  ).container

  const div1 = container.querySelector('.defaultblogDetail')
  expect(div1).not.toHaveStyle('display: none')

  const div2 = container.querySelector('.hiddenblogDetail')
  expect(div2).toHaveStyle('display: none')

})