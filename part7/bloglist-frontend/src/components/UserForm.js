import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createLogin, setLoggedInUser } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { TextField, Button } from '@material-ui/core'

const UserForm = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedInUser(user))
    }
  }, [dispatch])

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
        <h2>login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <TextField label='username' {...username.fields()} />
          </div>
          <div>
            <TextField label='password' type='password' {...password.fields()} />
          </div>
          <Button variant='contained' color='primary' id="login-button" type="submit">
            login
          </Button>
        </form>
      </div>
    )
  }
  return (
    <div />
  )
}

export default UserForm