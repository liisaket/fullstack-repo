import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const initialState = []

const anecSlice = createSlice({
  name: 'anecdotes', initialState,
  reducers: {
    voteAnecdote(state, action) {
        const voteAnec = state.find(anec => anec.id === action.payload)
        const voted = { ...voteAnec, votes: voteAnec.votes + 1 }
        return state.map(anec => anec.id !== action.payload ? anec : voted)
    },
    appendAnec(state, action) {
      state.push(action.payload)
    },
    setAnecs(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, appendAnec, setAnecs } = anecSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecService.getAll()
    dispatch(setAnecs(anecs))
  }
}

export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}

export default anecSlice.reducer