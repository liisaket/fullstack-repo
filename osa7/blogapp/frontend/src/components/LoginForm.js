import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, getUser } from '../reducers/userReducer'
import Togglable from './Togglable'

const LoginForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => {
    return state.user})

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginUser = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <div>
      {!user && <Togglable buttonLabel='login'>
        <form onSubmit={loginUser}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type="submit">
            login
          </button>
        </form>
      </Togglable>}
    </div>
  )
}

export default LoginForm