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
  const reducer = ([bigAuthor, bigCount], [author, articles]) => {
    console.log(`Comparing ${bigAuthor}:${bigCount} to ${author}:${articles.length}`)
    if (bigAuthor === null || bigCount < articles.length)
      return [author, articles.length]
    else
      return [bigAuthor, bigCount]
  }

  const grouped = groupBy('author')(blogs)
  // const authorCounts = Object.entries(grouped).map(([key, value]) => {return { [key] : value.length }}).flat()
  // console.log(authorCounts)
  console.log(Object.entries(grouped).reduce(reducer, [null, -1])[0])
}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}