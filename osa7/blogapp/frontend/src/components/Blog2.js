import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const user = useSelector(state => {
    return state.user})

  if (!blog || !user) {
    return null
  }
  const canRemove = user && blog.user.username===user.username

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`a like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  const remove = async (blog) => {
    try {
      if (window.confirm(`sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(removeBlog(blog))
        dispatch(setNotification(`removed blog '${blog.title}' by ${blog.author}`))
      }
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <div>
        <div> <a href={blog.url}>{blog.url}</a> </div>
        <div>{blog.likes} likes <button onClick={() => like(blog)}>like</button></div>
        <div>added by {blog.user && blog.user.name}</div>
        {canRemove&&<button onClick={() => remove(blog)}>delete</button>}
      </div>
    </div>
  )}

export default Blog