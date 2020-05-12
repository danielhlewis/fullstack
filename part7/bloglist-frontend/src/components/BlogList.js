import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs.sort((x,y) => y.votes - x.votes))
  const user = useSelector(state => state.login)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs( blogs ))
    )
  }, [])

  if (user === null) {
    return <div></div>
  }
  return (
    <div>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default BlogList