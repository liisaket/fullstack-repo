import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer'
import { setNotification } from '../reducers/notifReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => {
    return state.user})

  const logoutUser = async () => {
    dispatch(logout())
    dispatch(setNotification('logged out'))
  }

  return (
    <div>
      {user && <div>
        <p>{user.name} logged in</p>
        <button onClick={logoutUser}>logout</button>
      </div>}
    </div>
  )
}

export default Logout