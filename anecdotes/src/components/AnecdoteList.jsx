import { useAnecdotes, useAnecdoteActions } from '../stores/anecdoteStore'
import { useNotificationActions } from '../stores/notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, removeAnecdote } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleVote = anecdote => {
    incrementVotes(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  const handleDelete = anecdote => {
    removeAnecdote(anecdote.id)
    notify(`you deleted '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            {anecdote.votes === 0 && <button onClick={() => handleDelete(anecdote)}>delete</button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList