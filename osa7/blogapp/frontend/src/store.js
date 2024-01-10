import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'

export default configureStore({
  reducer: {
    notification: notifReducer
  }
})