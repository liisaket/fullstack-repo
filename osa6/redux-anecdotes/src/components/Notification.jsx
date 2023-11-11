import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (notification === null) {
    return null
  } else {
    return (
      <div>
        <div style={style}>
          {notification}
        </div>
        <br></br>
      </div>
    )
  }
}

export default Notification