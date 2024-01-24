import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { getUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'
import userService from './services/users'

import Blog from './components/Blog'
import Blogs from './components/Blogs'
import BlogForm from './components/BlogForm'
import Cover from './components/Cover'
import Login from './components/Login'
import Menu from './components/Menu'
import Notification from './components/Notification'
import Register from './components/Register'
import User from './components/User'
import Users from './components/Users'

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

  return (
    <Router>
      <div className='container'>
        <Notification />
        <Menu /><br></br>
        <h2>blog app</h2><br></br>
        <Routes>
          <Route path="/" element={<Cover />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/blogs" element={<Blogs user={user}/>}/>
          <Route path="/create" element={<BlogForm user={user}/>}/>
          <Route path="/users" element={<Users user={user} users={users}/>} />
          <Route path="/users/:id" element={<User online={user} users={users} />} />
          <Route path="/blogs/:id" element={<Blog blogs={blogs} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App