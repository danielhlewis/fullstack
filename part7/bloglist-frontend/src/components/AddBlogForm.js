import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'


const AddBlogForm = () => {
  const dispatch = useDispatch()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(createBlog(title.value, author.value, url.value))
    title.reset()
    author.reset()
    url.reset()
  }

  return (
    <form onSubmit={addBlog}>
      <div>title: <input {...title.fields()} /></div>
      <div>author: <input {...author.fields()} /></div>
      <div>url: <input {...url.fields()} /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default AddBlogForm