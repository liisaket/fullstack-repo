import { configureStore } from '@reduxjs/toolkit'
import notifReducer from './reducers/notifReducer'
import blogReducer from './reducers/blogReducer'

export default configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notifReducer
  }
})