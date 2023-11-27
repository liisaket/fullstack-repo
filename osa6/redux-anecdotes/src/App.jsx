import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'


import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecService from './services/anecdotes'
import { initializeAnecdotes, setAnecs } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  
  const queryClient = useQueryClient()

  const result = useQuery({
  queryKey: ['anecdotes'],
  queryFn: getAnecdotes
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h2>Anecdotes</h2>

      {[...anecdotes].sort(function(first, second) {
        return second.votes - first.votes}).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote)}>vote</button>
          </div>
          <br></br>
        </div>
      )
      }
    </div>
  )
}

export default App