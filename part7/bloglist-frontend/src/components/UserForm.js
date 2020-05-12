import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLogin, createLogout, setLoggedInUser } from '../reducers/loginReducer'
import { useField } from '../hooks'

const UserForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
    }
  }, [])

  const user = useSelector(state => state.login)
  // console.log(user)

  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(createLogin(username.value, password.value))
  }

  const username = useField('text')
  const password = useField('password')
  if (user == null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username.fields()} />
          </div>
          <div>
            password
            <input {...password.fields()} />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div />
  )
}

export default UserForm