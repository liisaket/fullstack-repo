const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  return likes.reduce((a, b) => a + b, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const favorite = Math.max(...likes)
  for (id in blogs) {
    if (blogs[id].likes === favorite) {
      return {
        'title': blogs[id].title,
        'author': blogs[id].author,
        'likes': blogs[id].likes
      }
    }
  }
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const results = _.values(_.groupBy(authors)).map(b => ({ author: b[0], blogs: b.length }))
  const mostblogs = Math.max(...results.map(b => b.blogs))
  for (id in results) {
    if (results[id].blogs === mostblogs) {
      return {
        'author': results[id].author,
        'blogs': results[id].blogs
      }
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}