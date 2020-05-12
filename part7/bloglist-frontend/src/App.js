import React from 'react'
import { useSelector } from 'react-redux'
import Container from '@material-ui/core/Container'

import Notification from './components/Notification'
import UserForm from './components/UserForm'
import NavBar from './components/NavBar'
import PageSwitch from './components/PageSwitch'



const App = () => {
  const user = useSelector(state => state.login)

  if (user === null) {
    return (
      <Container>
        <Notification />
        <UserForm />
      </Container>
    )
  }
  return (
    <Container>
      <NavBar />
      <Notification />
      <PageSwitch />
    </Container>
  )
}

export default App