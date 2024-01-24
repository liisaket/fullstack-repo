import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notifReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => {
    return state.user})

  const logoutUser = async (event) => {
    event.preventDefault()
    try {
      dispatch(logout())
      dispatch(setNotification('logged out'))
      navigate('/')
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'danger'))
    }
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      {user ?
        <span>
          <Link style={padding} to="/blogs">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <Link style={padding} onClick={logoutUser}>logout</Link>
          <i>{user.username} logged in&nbsp;</i></span>
        :<span>
          <Link style={padding} to="/login">login</Link>
          <Link style={padding} to="/register">register</Link>
        </span>
      }
    </div>
  )
}

export default Menu