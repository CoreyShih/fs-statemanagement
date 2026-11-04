import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = content => ({
  content,
  id: getId(),
  votes: 0
})

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    incrementVotes: async id => {
      const anecdote = get().anecdotes.find(anecdote => anecdote.id === id)
      const updatedAnecdote = await anecdoteService.update(id, { ...anecdote, votes: anecdote.votes + 1 })
      set(state => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      }))
    },
    addAnecdote: async content => {
      const newAnecdote = await anecdoteService.createNew(asObject(content))
      set(state => ({ anecdotes: state.anecdotes.concat(newAnecdote) }))
    },
    removeAnecdote: async id => {
      await anecdoteService.remove(id)
      set(state => ({ anecdotes: state.anecdotes.filter(anecdote => anecdote.id !== id) }))
    },
    setFilter: value => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    }
  }
}))

const useFilter = () => useAnecdoteStore(state => state.filter)
const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useFilter()
  const compareFn = (a, b) => b.votes - a.votes

  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  ).toSorted(compareFn)
}
const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)

export { useFilter, useAnecdotes, useAnecdoteActions }