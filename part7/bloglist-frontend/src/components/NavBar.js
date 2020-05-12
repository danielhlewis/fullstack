import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { createLogout } from '../reducers/loginReducer'
import { AppBar, Toolbar, Button, Grid } from '@material-ui/core'

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLogout = async () => {
    dispatch(createLogout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          justify="space-between" // Add it here :)
          container
        >
          <Grid item>
            <Button color="inherit" component={Link} to="/">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
          </Grid>
          <Grid item>
            <span >{user.name} logged in </span>
            <Button color="inherit" onClick={handleLogout}>
              logout
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar