import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { notifReducer } from '../reducers/notifReducer'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(notifReducer(`added a new anecdote "${content}"`))
    setTimeout(() => {
      dispatch(notifReducer(null))}, 5000)
    dispatch(newAnecdote(content))
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote"/>
          <button type="submit">create</button>
        </form>
      <br></br>
    </div>
  )
}

export default NewAnecdote