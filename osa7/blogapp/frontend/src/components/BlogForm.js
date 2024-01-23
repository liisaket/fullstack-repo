import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const onCreate = (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog({
        title: title.value,
        author: author.value,
        url: url.value,
        likes: 0
      }))
      dispatch(setNotification(`added a new blog ${title.value} by ${author.value}`))
      resetFields(event)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'danger'))
    }
  }

  const resetFields = (event) => {
    event.preventDefault()
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <h2>Create a new blog</h2>
        <form onSubmit={onCreate}>
          <div>
            title:
            <input {...title}/>
          </div>
          <div>
            author:
            <input {...author}/>
          </div>
          <div>
            url:
            <input {...url}/>
          </div>
          <button id='create-button' type="submit">create</button>
          <button onClick={resetFields}>reset</button>
        </form>
      </Togglable>
      <br></br>
    </div>
  )}

export default BlogForm