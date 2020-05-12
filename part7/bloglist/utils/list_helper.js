const groupBy = require('lodash/fp/groupBy')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (best, item) => {
    if (best === null || best.likes < item.likes)
      return item
    else
      return best
  }

  return blogs.reduce(reducer, null)
}

const mostBlogs = (blogs) => {
  return Object.entries(groupBy('author')(blogs))
    .map(([key, value]) => {return { author: key, count: value.length }})
    .reduce((x, y) => (x.count > y.count) ? x : y, { author: null, count: null })
}

const mostLikes = (blogs) => {
  return Object.entries(groupBy('author')(blogs))
    .map(([key, value]) => {return { author: key, likes: value.reduce(( sum, x ) => sum + x.likes, 0) }})
    .reduce((x, y) => (x.likes > y.likes) ? x : y, { author: null, likes: null })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}