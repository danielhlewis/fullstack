import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { createLogout } from '../reducers/loginReducer'


const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const style = {
    paddingRight: 5
  }
  
  const handleLogout = async () => {
    dispatch(createLogout())
  }

  return (
    <div style={{'backgroundColor': '#CCCCCC'}}>
      <Link style={style} to="/">blogs</Link>
      <Link style={style} to="/users">users</Link>
      <span>{user.name} logged in </span>
      <button onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default NavBar