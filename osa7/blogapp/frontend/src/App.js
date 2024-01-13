import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from './reducers/notifReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import BlogList from './components/BlogList'


const App = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initializeBlogs(blogs))
    })
  }, [dispatch])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      storageService.saveUser(user)
      dispatch(setNotification('welcome!'))
    } catch(e) {
      dispatch(setNotification('wrong username or password', 'error'))
    }
  }

  const logout = async () => {
    setUser(null)
    storageService.removeUser()
    dispatch(setNotification('logged out'))
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {!user && <Togglable buttonLabel='login'>
        <LoginForm login={login} />
      </Togglable>}
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={logout}>logout</button>
        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <br></br>
        <BlogList user={user}/>
      </div>
      }
    </div>
  )
}

export default App