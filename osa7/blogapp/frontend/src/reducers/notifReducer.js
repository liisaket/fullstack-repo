import { createSlice } from '@reduxjs/toolkit'

const initialState = { content: null, type: null }

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

export const setNotification = ( content, type='success' ) => {
  return async dispatch => {
    dispatch(set({ content, type }))
    setTimeout(() => {
      dispatch(clear())
    }, 5000)
  }
}

export const { set, clear } = notifSlice.actions
export default notifSlice.reducer