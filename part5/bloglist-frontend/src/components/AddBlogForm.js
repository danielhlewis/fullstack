import React, { useState } from 'react'

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
			title: <input value={title} 
					onChange={ event => setTitle(event.target.value) }
				/>
		</div>
		<div>
			author: <input value={author} 
					onChange={ event => setAuthor(event.target.value) }
				/>
		</div>
    <div>
			url: <input value={url} 
					onChange={ event => setUrl(event.target.value) }
				/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
		</form>
	)
}

export default AddBlogForm