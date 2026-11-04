import { useAnecdotes, useAnecdoteActions } from '../stores/anecdoteStore'
import { useNotificationActions } from '../stores/notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleClick = anecdote => {
    incrementVotes(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList