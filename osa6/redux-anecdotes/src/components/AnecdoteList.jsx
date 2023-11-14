import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notifReducer'

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

  const vote = (id, anecdote) => {
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    dispatch(addVote(id, anecdote))
  }
  
  return (
    <div>
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

export default AnecdoteList