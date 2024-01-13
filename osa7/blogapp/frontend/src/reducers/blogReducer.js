import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    add(state, action) {
      return state.concat(action.payload)
    },
    like(state, action) {
      const liked = action.payload
      return state.map(blog => blog.id===liked.id ? liked : blog)
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
    const blog = await blogService.create(object)
    dispatch(add(blog))
    dispatch(initializeBlogs())
  }
}

export const likeBlog = (object) => {
  return async dispatch => {
    const toLike = { ...object, likes: object.likes + 1 }
    const blog = await blogService.update(toLike)
    dispatch(like({ ...blog, user: object.user }))
  }
}

export const removeBlog = (object) => {
  return async dispatch => {
    await blogService.remove(object.id)
    dispatch(remove(object))
  }
}

export const { add, like, remove, set } = blogSlice.actions
export default blogSlice.reducer