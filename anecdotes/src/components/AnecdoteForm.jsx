import { useAnecdoteActions } from '../stores/anecdoteStore'
import { useNotificationActions } from '../stores/notificationStore'

const AnecdoteForm = () => {
  const { addAnecdote } = useAnecdoteActions()
  const { notify } = useNotificationActions()

  const handleSubmit = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    await addAnecdote(content)
    notify(`you created '${content}'`)
    event.target.reset()
  }

  return (
    <div>
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

export default AnecdoteForm