import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: null, color: null }

const notifSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    clear(state, action) {
      return initialState
    }
  },
})

export const setNotification = ( content, color='info' ) => {
  return async dispatch => {
    dispatch(set({ content, color }))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
  }
}

export const { set, clear } = notifSlice.actions
export default notifSlice.reducer