import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const filterSlice = createSlice({
  name: 'filter', initialState,
  reducers: {
    filterReducer(state, action) {
      const content = action.payload
      return state = content
    }
  }
})

export const { filterReducer } = filterSlice.actions
export default filterSlice.reducer