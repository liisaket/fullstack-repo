import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notifReducer'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.user})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
  }

  return (
    <div>
      {!user && <div>
        <h2>register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            register
          </Button>
        </Form>
      </div>}
    </div>
  )
}

export default Register