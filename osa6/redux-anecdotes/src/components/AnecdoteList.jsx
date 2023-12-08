import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from '../requests'
import { useContext } from 'react'
import NotifContext from '../NotifContext'

const AnecdoteList = () => {
  const queryClient = useQueryClient()

  const [notif, notifDispatch] = useContext(NotifContext)

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const addVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    notifDispatch({ type: "VOTE", payload: `anecdote '${anecdote.content}' voted` })
    setTimeout(() => {notifDispatch({ type: "NULL" })}, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const anecdotes = result.data
  
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
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
          <br></br>
        </div>
      )
    }
    </div>
  )
}

export default AnecdoteList