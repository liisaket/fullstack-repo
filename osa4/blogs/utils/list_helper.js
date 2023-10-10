const logger = require('../utils/logger')

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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}