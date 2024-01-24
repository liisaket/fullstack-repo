import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification.content) {
    return
  }

  return (
    <Alert variant={notification.type}>
      {notification.content}
    </Alert>
  )
}

export default Notification