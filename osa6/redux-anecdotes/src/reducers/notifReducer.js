import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notifSlice = createSlice({
  name: 'notification', initialState,
  reducers: {
    notifReducer(state, action) {
      const content = action.payload
      return state = content
    }
  }
})

export const { notifReducer } = notifSlice.actions
export default notifSlice.reducer