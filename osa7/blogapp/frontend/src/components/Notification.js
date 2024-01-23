import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (!notification.content) {
    return
  }

  const style = {
    color: notification.color==='error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <Alert variant={notification.type}>
      {notification.content}
    </Alert>
  )
}

export default Notification