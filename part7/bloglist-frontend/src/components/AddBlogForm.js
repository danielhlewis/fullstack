import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { TextField, Button } from '@material-ui/core'

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
      <div>
        <TextField label='title' {...title.fields()} />
      </div>
      <div>
        <TextField label='author' {...author.fields()} />
      </div>
      <div>
        <TextField label='url' {...url.fields()} />
      </div>
      <div>
        <Button variant='contained' color='primary' type='submit'>
          add
        </Button>
      </div>
    </form>
  )
}

export default AddBlogForm