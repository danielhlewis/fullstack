import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  const hideableStyle = {...style, display: notification ? '' : 'None'}
  return (
    <div style={hideableStyle}>
      { notification }
    </div>
  )
}

export default Notification