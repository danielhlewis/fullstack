export const setNotification = (content, severity, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content,
      severity: severity
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

export const setSuccess = (content, seconds) => setNotification(content, 'success', seconds)
export const setError = (content, seconds) => setNotification(content, 'error', seconds)
export const setInfo = (content, seconds) => setNotification(content, 'info', seconds)
export const setWarning = (content, seconds) => setNotification(content, 'warning', seconds)

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const initialState = {
  message: '',
  timer: null,
  severity: null
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return {...state, message: action.data, severity: action.severity }
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