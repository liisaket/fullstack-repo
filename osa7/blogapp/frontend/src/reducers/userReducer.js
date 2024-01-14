import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storageService from '../services/storage'

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
    const user = await loginService.login({ username, password })
    storageService.saveUser(user)
    dispatch(setUser(user))
  }
}

export const logout = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(setUser(null))
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