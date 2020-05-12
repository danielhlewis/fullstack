import React, {useState, useEffect} from 'react'
import {
  Link, useRouteMatch
} from 'react-router-dom'
import userService from '../services/users'

const UserDetails = () => {
  const [user, setUser] = useState(null)
  const match = useRouteMatch('/users/:id')

  console.log(user)

  useEffect(() => {
    if (match) {
      console.log(match.params.id)
      userService.get(match.params.id).then(user => setUser(user))
    }
  }, [match])

  if (user === null) {
    return <div />
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)}
      </ul>
    </div>
  )

}

export default UserDetails