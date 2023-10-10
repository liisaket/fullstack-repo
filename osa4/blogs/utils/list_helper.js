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

function merge(first, second) {
  if (first.author === second.author) {
      first.likes = second.likes = [].concat(first.likes, second.likes).reduce((a,b) => a+b,0)
      return true
  }
  return false
}

const mostLikes = (blogs) => {
  const allLikes = blogs.map(blog => ({author: blog.author, likes: blog.likes}))
  const theirLikes = _.uniqWith(allLikes, merge)
  const mostLikes = Math.max(...theirLikes.map(b => b.likes))
  for (id in theirLikes) {
    if (theirLikes[id].likes === mostLikes) {
      return {
        'author': theirLikes[id].author,
        'likes': theirLikes[id].likes
      }
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}