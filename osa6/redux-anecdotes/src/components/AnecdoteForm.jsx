import { useDispatch } from 'react-redux'
import { createAnec } from '../reducers/anecdoteReducer'
import { notifReducer } from '../reducers/notifReducer'
import anecService from '../services/anecdotes'

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnec = await anecService.createNew(content)
    dispatch(createAnec(content))

    dispatch(notifReducer(`added a new anecdote "${newAnec.content}"`))
    setTimeout(() => {
      dispatch(notifReducer(null))}, 5000) 
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