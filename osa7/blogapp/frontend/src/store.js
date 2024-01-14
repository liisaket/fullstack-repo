import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

export default configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notifReducer,
  }
})