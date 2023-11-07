import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === null ) {
      return state.anecdotes
    }
    return state.anecdotes.filter(
      anec => anec.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }
  
  return (
    <div>
      {anecdotes.sort(function(first, second) {
        return second.votes - first.votes}).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
          <br></br>
        </div>
      )
      }
    </div>
  )
}

export default AnecdoteList