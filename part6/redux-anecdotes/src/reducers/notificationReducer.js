export const setNotification = (content, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
    dispatch({
      type: 'CLEAR_TIMER'
    })
    const timer = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)
    dispatch({
      type: 'SET_TIMER_ID',
      data: timer
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const initialState = {
  message: '',
  timer: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {...state, message: action.data }
    case 'CLEAR_NOTIFICATION':
      return initialState
    case 'CLEAR_TIMER':
      if (state.timer !== null)
        clearTimeout(state.timer)
      return {...state, timer: null }
    case 'SET_TIMER_ID':
      return {...state, timer: action.data }
    default:
      return state
  }
}

export default notificationReducer