import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from './anecdoteStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockAnecdotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('returned anecdotes sorted by votes', async () => {
    const mockAnecdotes = [
      { id: 1, content: 'middle', votes: 4 },
      { id: 2, content: 'most', votes: 6 },
      { id: 3, content: 'least', votes: 1 }
    ]

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual([mockAnecdotes[1], mockAnecdotes[0], mockAnecdotes[2]])
  })

  it('incrementVotes increases the number of votes for an anecdote', async () => {
    const anecdote = { id: 1, content: 'Test', votes: 0 }
    useAnecdoteStore.setState({ anecdotes: [anecdote] })
    anecdoteService.update.mockResolvedValue({ ...anecdote, votes: 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.incrementVotes(1)
    })

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current[0].votes).toBe(1)
  })

  describe('useAnecdotes filtering', () => {
    const anecdotes = [
      { id: 1, content: 'middle', votes: 4 },
      { id: 2, content: 'most', votes: 6 },
      { id: 3, content: 'least', votes: 1 }
    ]

    beforeEach(() => {
      useAnecdoteStore.setState({ anecdotes })
    })

    it('returns all anecdotes with no filter', () => {
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current).toHaveLength(3)
    })

    it('returns appropriate anecdotes with filter "m"', () => {
      useAnecdoteStore.setState({ filter: 'm' })
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current).toHaveLength(2)
    })

    it('returns appropriate anecdotes with filter "eas"', () => {
      useAnecdoteStore.setState({ filter: 'eas' })
      const { result } = renderHook(() => useAnecdotes())
      expect(result.current).toHaveLength(1)
    })
  })
})