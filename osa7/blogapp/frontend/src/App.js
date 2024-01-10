import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { setNotification } from './reducers/notifReducer'

import blogService from './services/blogs'
import loginService from './services/login'
import storageService from './services/storage'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const [user, setUser] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  const createBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const createdBlog = await blogService.create(newBlog)
      blogs.concat(createdBlog)
      const response = await blogService.getAll()
      setBlogs(response)
      dispatch(setNotification(`Added a new blog ${createdBlog.title} by ${createdBlog.author}`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  const like = async (blog) => {
    try {
      await blogService.update({ ...blog, likes: blog.likes + 1, user: blog.user.id })
      const response = await blogService.getAll()
      setBlogs(response)
      dispatch(setNotification(`a like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id, user.token)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      dispatch(setNotification(`removed blog '${blog.title}' by ${blog.author}`))
    }
  }

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
          <BlogForm createBlog={createBlog} />
        </Togglable>
        <br></br>
        {blogs.sort(function(first, second) {
          return second.likes - first.likes}).map(blog =>
          <Blog key={blog.id} blog={blog}
            like={() => like(blog)} remove={() => remove(blog)}
            canRemove={user && blog.user.username===user.username}/>
        )}
      </div>
      }
    </div>
  )
}

export default App