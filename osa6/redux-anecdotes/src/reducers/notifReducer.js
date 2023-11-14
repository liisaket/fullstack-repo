import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notifSlice = createSlice({
  name: 'notification', initialState,
  reducers: {
    notifReducer(state, action) {
      return action.payload
    }
  }
})

export const setNotification = (text, seconds) => {
  return async dispatch => {
    dispatch(notifReducer(
      text))
    setTimeout(() => {
      dispatch(notifReducer(null))}, seconds*1000)
  }
}

export const { notifReducer } = notifSlice.actions
export default notifSlice.reducer