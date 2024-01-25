import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import userService from '../services/users'
import storageService from '../services/storage'
import { setNotification } from './notifReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const login = ( username, password ) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      storageService.saveUser(user)
      dispatch(setUser(user))
      dispatch(setNotification(`welcome ${username}`))
      return true
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 'danger'))
      return false
    }
  }
}

export const logout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(setUser(null))
  }
}

export const register = ( username, name, password ) => {
  return async dispatch => {
    try {
      await userService.register({ username, name, password })
      dispatch(setNotification('registration was successful'))
      return true
    } catch (exception) {
      dispatch(setNotification(`${exception.response.data.error}`, 'danger'))
      return false
    }
  }
}

export const getUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer