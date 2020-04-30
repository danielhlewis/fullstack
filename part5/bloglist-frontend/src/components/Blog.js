import React, {useState} from 'react'

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
    console.log("Liking it")
    addLike(blog)
  }

  const remove = () => {
    console.log("Removing blog")
    removeBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={ () => setHidden(!hidden) }>
          { hidden ? 'show' : 'hide' }
        </button>
      </div>
      <div style={{ display: hidden ? 'none' : '' }}>
        <div>{ blog.url }</div>
        <div>{ blog.likes }<button onClick={like}>like</button></div>
        <div>{ blog.user.name }</div>
        <div style={{ display: username === blog.user.username ? '' : 'none' }}>
          <button onClick={ remove } >remove</button>
        </div>
      </div>
  </div>
)}

export default Blog
