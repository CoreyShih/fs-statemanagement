import { useFilter, useAnecdoteActions } from '../stores/anecdoteStore'

const Filter = () => {
  const filter = useFilter()
  const { setFilter } = useAnecdoteActions()
  
  const handleChange = event => setFilter(event.target.value)

  const style = { marginBottom: 10 }

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} data-testid="filter" />
    </div>
  )
}

export default Filter