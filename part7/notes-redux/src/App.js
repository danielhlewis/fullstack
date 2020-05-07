import React, {useEffect} from 'react'
import NewNote from './components/NewNote.js'
import Notes from './components/Notes.js'
import VisibilityFilter from './components/VisibilityFilter'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeNotes()) 
  },[dispatch]) 

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
      </div>

      <Switch>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/users">
          {/* <Users /> */}
        </Route>
        <Route path="/">
          {/* <Home /> */}
        </Route>
      </Switch>

      <div>
        <i>Note app, Department of Computer Science 2020</i>
      </div>
    </Router>
  )
}

export default App