import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notifReducer'
import { register } from '../reducers/userReducer'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.user})

  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(register(username, name, password)).then(result => {
      if (result) {
        navigate('/login')
      }
    })
  }

  return (
    <div>
      {!user && <div>
        <h2>register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={({ target }) => setName(target.value)}
            />
          </Form.Group>  <Form.Group>
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
          <br></br>
          <Button variant="primary" type="submit">
            register
          </Button>
        </Form>
      </div>}
    </div>
  )
}

export default Register