import React from 'react'
import { useSelector } from 'react-redux'

import './Notification.css'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  if (message === null) {
    return null
  }


  return (
    <div className={notification.severity}>
      {message}
    </div>
  )
}

export default Notification