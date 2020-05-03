import React, { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, username }) => {
  const [hidden, setHidden] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    addLike(blog)
  }

  const remove = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div className="titleAndAuthor">
        {blog.title} {blog.author}
        <button onClick={ () => setHidden(!hidden) }>
          { hidden ? 'show' : 'hide' }
        </button>
      </div>
      <div className="details" style={{ display: hidden ? 'none' : '' }}>
        <div className="url">{ blog.url }</div>
        <div className="likes">{ blog.likes }<button className="like-button" onClick={like}>like</button></div>
        <div>{ blog.user.name }</div>
        <div style={{ display: username === blog.user.username ? '' : 'none' }}>
          <button onClick={ remove } >remove</button>
        </div>
      </div>
    </div>
  )}

export default Blog
