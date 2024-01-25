import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.user})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()
    dispatch(login(username, password)).then(result => {
      if (result) {
        navigate('/')
      }
    })
  }

  return (
    <div>
      {!user && <div>
        <h2>login</h2>
        <Form onSubmit={loginUser}>
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
          <br></br>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form>
      </div>}
    </div>
  )
}

export default LoginForm