import loginService from '../services/login'
import setNotification from './notificationReducer'
import { setToken } from '../services/blogs'

const loginReducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGIN':
      setToken(action.data.token)
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const createLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN',
        data: user,
      })
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 5))
    }
  }
}

export const setLoggedInUser = (token) => {
  return async dispatch => {
    setToken(token)
    dispatch({
      type: 'LOGIN',
      data: token,
    })
  }
}

export const createLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer