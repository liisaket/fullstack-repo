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

  const menu = {
    border: 'solid lightgrey',
    backgroundColor: 'lightgrey'
  }

  return (
    <div>
      {user && <div style={menu}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in&nbsp;
        <button onClick={logoutUser}>logout</button>
      </div>}
    </div>
  )
}

export default Menu