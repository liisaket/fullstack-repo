import { createSlice } from '@reduxjs/toolkit'
import anecService from '../services/anecdotes'

const initialState = []

const anecSlice = createSlice({
  name: 'anecdotes', initialState,
  reducers: {
    voteAnecdote(state, action) {
      return state.map(anec => anec.id !== action.payload.id ? anec : action.payload)
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

/// VIRHE koodissa, lisää 2 anecdottia databaseen
export const createAnec = content => {
  return async dispatch => {
    const newAnec = await anecService.createNew(content)
    dispatch(appendAnec(newAnec))
  }
}

export const addVote = (id, anecdote) => {
  return async dispatch => {
    const voted = { ...anecdote, votes: anecdote.votes + 1 }
    const updatedAnec = await anecService.updateObject(id, voted)
    dispatch(voteAnecdote(updatedAnec))
  }
}

export default anecSlice.reducer