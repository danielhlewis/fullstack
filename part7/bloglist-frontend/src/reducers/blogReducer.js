import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INITIALIZE_BLOGS':
      return action.data
    case 'UPDATE_BLOG':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data)
    case 'REMOVE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return async dispatch => {
    dispatch({
      type: 'INITIALIZE_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create({title, author, url})
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      })
      dispatch(setNotification("Added Blog", 5))
    } catch (exception) {
      console.log(exception.response)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const addLike = (blogObject) => {
  return async dispatch => {
    try {
      const likedBlog = { ...blogObject, likes: blogObject.likes + 1 }
      const newBlog = await blogService.update(likedBlog.id, likedBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: newBlog,
      })
      dispatch(setNotification(`Liked ${newBlog.title}`, 5))
    } catch (exception) {
      console.log(exception.response)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    try {
      console.log(blog)
      console.log(comment)
      const newBlog = await blogService.addComment(blog.id, comment)
      console.log(newBlog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: newBlog,
      })
      dispatch(setNotification(`Added Comment: ${comment}`, 5))
    } catch (exception) {
      console.log(exception.response)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export const removeBlog = (blogObject) => {
  return async dispatch => {
    try {
      await blogService.remove(blogObject.id)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blogObject.id,
      })
      dispatch(setNotification(`Removed ${blogObject.title}`, 5))
    } catch (exception) {
      console.log(exception.response)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }
}

export default blogReducer