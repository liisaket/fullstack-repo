import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notifReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    add(state, action) {
      return state.concat(action.payload)
    },
    update(state, action) {
      const updated = action.payload
      return state.map(blog => blog.id===updated.id ? updated : blog)
    },
    remove(state, action) {
      const blog = action.payload
      return state.filter(b => b.id !== blog.id)
    },
    set(state, action) {
      return action.payload
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(set(blogs))
  }
}

export const createBlog = (object) => {
  return async dispatch => {
    try {
      const blog = await blogService.create(object)
      dispatch(add(blog))
      dispatch(initializeBlogs())
      dispatch(setNotification(`added a new blog ${object.title} by ${object.author}`))
      return true
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 'danger'))
      return false
    }
  }
}

export const likeBlog = (object) => {
  return async dispatch => {
    const toLike = { ...object, likes: object.likes + 1 }
    const blog = await blogService.update(toLike)
    dispatch(update({ ...blog, user: object.user }))
  }
}

export const commentBlog = (object) => {
  return async dispatch => {
    try {
      const blog = await blogService.comment(object)
      dispatch(update({ ...blog, user: object.user }))
      dispatch(setNotification(`added a new comment "${object.comment}"`))
      return true
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 'danger'))
      return false
    }
  }
}

export const removeComment = (object) => {
  return async dispatch => {
    const blog = await blogService.removeComment(object)
    dispatch(update({ ...blog }))
  }
}

export const removeBlog = (object) => {
  return async dispatch => {
    try {
      await blogService.remove(object.id)
      dispatch(remove(object))
      dispatch(setNotification(`removed blog '${object.title}' by ${object.author}`))
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 'danger'))
      return false
    }
  }
}

export const { add, update, remove, set } = blogSlice.actions
export default blogSlice.reducer