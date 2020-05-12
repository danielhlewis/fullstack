import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useRouteMatch } from 'react-router-dom'
import blogService from '../services/blogs'
import { addLike, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks'

const BlogDetails = () => {
  const [blog, setBlog] = useState(null)
  const newComment = useField('text')

  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const match = useRouteMatch('/blogs/:id')

  useEffect(() => {
    if (match) {
      blogService.get(match.params.id).then(blog => setBlog(blog))
    }
  }, [])

  const handleLike = () => {
    dispatch(addLike(blog))
    setBlog({...blog, likes: blog.likes + 1})
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, newComment.value))
    setBlog({...blog, comments: [...blog.comments, newComment.value]})
    newComment.reset()
  }

  if (blog === null) {
    return <div />
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div className="likes">{ blog.likes }<button className="like-button" onClick={handleLike}>like</button></div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <form>
      <input {...newComment.fields()}></input><button onClick={handleAddComment}>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )

}

export default BlogDetails