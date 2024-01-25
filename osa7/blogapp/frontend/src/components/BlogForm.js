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
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    })).then(result => {
      if (result) {
        resetFields(event)
        navigate('/blogs')
      }
    })
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
          <Form.Control {...title}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control {...author}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control {...url}/>
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