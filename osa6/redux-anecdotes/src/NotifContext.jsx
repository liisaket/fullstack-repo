import { createContext, useReducer } from 'react'

const notifReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return action.payload
    case "VOTE":
      return action.payload
    case "ERROR":
      return action.payload
    case "NULL":
      return null
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, null)

  return (
    <NotifContext.Provider value={[notif, notifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext