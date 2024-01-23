const { flow, countBy, toPairs, maxBy, last, zipObject } = require("lodash"); 

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return null
  }
  else{
    return blogs.reduce((favorite, blog) => favorite.likes > blog.likes ? favorite : blog)
  }  
}

const mostBlogs = (blogs) => {

  if (blogs.length === 0) {
    return null
  }
  else{

    const author = flow(
      blogs => countBy(blogs, 'author'), // authors and count
      toPairs, // pairing to arrays
      blogs => maxBy(blogs, last), // max from array
      blog => zipObject(['author', 'blogs'], blog) // to desired format
    )

    console.log(author(blogs))

    return author(blogs)
  }
}


module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}