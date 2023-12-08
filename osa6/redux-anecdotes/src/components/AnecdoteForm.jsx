import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotifContext from '../NotifContext'

const NewAnecdote = () => {
  const queryClient = useQueryClient()
  const [notif, notifDispatch] = useContext(NotifContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    if (content.length < 5) {
      notifDispatch({ type: "ERROR", 
      payload: `too short anecdote, must have length 5 or more` })
      setTimeout(() => {notifDispatch({ type: "NULL" })}, 5000)
    } else {
      newAnecdoteMutation.mutate({ content, votes: 0 })
      notifDispatch({ type: "ADD", payload: `anecdote '${content}' added` })
      setTimeout(() => {notifDispatch({ type: "NULL" })}, 5000)
    }

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
      <br></br>
    </div>
  )
}

export default NewAnecdote