import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const UserList = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])

  console.log(users)
  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => 
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}

export default UserList