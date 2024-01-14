import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getUser } from './reducers/userReducer'
import { initializeBlogs } from './reducers/blogReducer'

import blogService from './services/blogs'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'


const App = () => {
  const dispatch = useDispatch()
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LoginForm />
      {user && <div>
        <Logout />
        <BlogForm />
        <BlogList />
      </div>
      }
    </div>
  )
}

export default App