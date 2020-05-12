import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message = notification.message
  
  return (
    <div>
      {(message &&
        <Alert severity={notification.severity}>
          {message}
        </Alert>
      )}
    </div>
  )
}

export default Notification