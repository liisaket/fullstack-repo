import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notifReducer'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => {
    return state.user})

  const logoutUser = async () => {
    dispatch(logout())
    dispatch(setNotification('logged out'))
  }

  const padding = {
    paddingRight: 5
  }

  return (
    <div>
      <Link style={padding} to="/">home</Link>
      <Link style={padding} to="/blogs">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user ? <span>
        <Link style={padding} onClick={logoutUser}>logout</Link>
        <i>{user.username} logged in&nbsp;</i></span>
        :<Link style={padding} to="/login">login</Link>
      }
    </div>
  )
}

export default Menu