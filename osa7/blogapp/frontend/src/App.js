import { useState, useEffect } from 'react'
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
import Menu from './components/Menu'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'


const App = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const user = useSelector(state => {
    return state.user})

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  const blogs = useSelector(state => {
    return state.blogs
  })
  // <Route path="/blogs/:id" element={<Blog />} />

  return (
    <Router>
      <div>
        <Menu />
        <h2>blog app</h2>
        <Notification />
        <LoginForm />
        {user && <div>
          <Routes>
            <Route path="/" element={
              <div>
                <BlogForm />
                <BlogList />
              </div>}/>
            <Route path="/users" element={<Users users={users}/>} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
          </Routes>
        </div>
        }
      </div>
    </Router>
  )
}

export default App