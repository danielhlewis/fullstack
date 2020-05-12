import React from 'react'

import AddBlogForm from './AddBlogForm'
import Togglable from './Togglable'
import BlogList from './BlogList'
import UserList from './UserList'
import UserDetails from './UserDetails'
import BlogDetails from './BlogDetails'

import { Switch, Route } from 'react-router-dom'

const blogFormRef = React.createRef()

const blogForm = () => (
  <Togglable buttonLabel='new blog' ref={blogFormRef}>
    <AddBlogForm />
  </Togglable>
)

const PageSwitch = () => {
  return (
    <Switch>
      <Route path="/users/:id">
        <UserDetails />
      </Route>
      <Route path="/users">
        <UserList />
      </Route>
      <Route path="/blogs/:id">
        <BlogDetails />
      </Route>
      <Route path="/">
        <h2>blog app</h2>
        { blogForm() }
        <BlogList />
      </Route>
    </Switch>
  )
}

export default PageSwitch