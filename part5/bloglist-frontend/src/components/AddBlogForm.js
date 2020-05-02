import React, { useState } from 'react'
import PropTypes from 'prop-types'


const AddBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    createBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
			title: <input id='title' value={title}
          onChange={ event => setTitle(event.target.value) }
        />
      </div>
      <div>
			author: <input id='author' value={author}
          onChange={ event => setAuthor(event.target.value) }
        />
      </div>
      <div>
			url: <input id='url' value={url}
          onChange={ event => setUrl(event.target.value) }
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

AddBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default AddBlogForm