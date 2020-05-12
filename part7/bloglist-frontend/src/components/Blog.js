import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@material-ui/core'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  return (
    <TableRow key={blog.id}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </TableCell>
      <TableCell align='right' style={{ display: user.username === blog.user.username ? '' : 'none' , paddingLeft: 5}}>
        <button onClick={() => dispatch(removeBlog(blog)) } >remove</button>
      </TableCell>
    </TableRow>
  )}

export default Blog
