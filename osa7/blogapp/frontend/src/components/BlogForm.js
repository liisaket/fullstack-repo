import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'

const BlogForm = ({ user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  if (!user) {
    return null
  }

  const handleSubmit = (event) => {
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
      navigate('/blogs')
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
      <h3>add a new blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control input {...title}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control input {...author}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control input {...url}/>
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit">
            add
        </Button>&nbsp;
        <Button onClick={resetFields}>
            reset
        </Button>
      </Form>
    </div>
  )}

export default BlogForm