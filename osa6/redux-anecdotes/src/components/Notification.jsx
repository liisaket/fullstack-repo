import { useContext } from 'react'
import NotifContext from '../NotifContext'

const Notification = () => {
  const [notif, dispatch] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notif === null) {
    return null
  } else {
    return (
      <div>
        <div style={style}>
          {notif}
        </div>
      </div>
    )
  }
}

export default Notification