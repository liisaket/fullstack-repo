import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'

const BlogForm = ({ blogFormRef }) => {
  const dispatch = useDispatch()
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
        votes: 0
      }))
      dispatch(setNotification(`added a new blog ${title.value} by ${author.value}`))
      resetFields(event)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
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
    </div>
  )}

export default BlogForm