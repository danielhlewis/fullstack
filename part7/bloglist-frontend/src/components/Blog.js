import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="titleAndAuthor"><Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link> 
        <span style={{ display: user.username === blog.user.username ? '' : 'none' , paddingLeft: 5}}>
          <button onClick={() => dispatch(removeBlog(blog)) } >remove</button>
        </span>
      </div>
    </div>
  )}

export default Blog
