import React, {useEffect} from 'react'

import Notification from './components/Notification'
import UserForm from './components/UserForm'
import NavBar from './components/NavBar'
import PageSwitch from './components/PageSwitch'

import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector(state => state.login)

  if (user === null) {
    return <UserForm />
  }
  return (
    <div>
      <NavBar />
      <Notification />
      <PageSwitch />
    </div>
  )
}

export default App