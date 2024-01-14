import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { getUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import userService from './services/users'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Users from './components/Users'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => {
    return state.user})

  const padding = {
    paddingRight: 5
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])


  return (
    <Router>
      <div>
        <h2>blogs</h2>
        <Notification />
        <LoginForm />
        {user && <div>
          <Link style={padding} to="/">home</Link>
          <Link style={padding} to="/users">users</Link>
          <Logout />
          <Routes>
            <Route path="/" element={
              <div>
                <BlogForm />
                <BlogList />
              </div>}/>
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        }
      </div>
    </Router>
  )
}

export default App