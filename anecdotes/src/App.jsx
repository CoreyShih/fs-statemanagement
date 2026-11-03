import { useAnecdotes, useAnecdoteActions } from "./store"

const App = () => {
  const anecdotes = useAnecdotes()
  const { incrementVotes, addAnecdote } = useAnecdoteActions()

  const vote = id => {
    incrementVotes(id)
  }

  const handleSubmit = event => {
    event.preventDefault()
    addAnecdote(event.target.anecdote.value)
    event.target.reset()
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" data-testid="new" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
