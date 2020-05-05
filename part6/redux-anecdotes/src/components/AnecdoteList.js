import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleVote }) => {
  return(
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const anecdotes =
    useSelector(state => state.anecdotes)
      .filter(x => x.content.includes(filter))
      .sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteFor(id))
  }

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote.id)}
          />
      )}
    </ul>
  )
}

export default AnecdoteList

