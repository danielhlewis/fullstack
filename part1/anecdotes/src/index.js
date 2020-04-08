import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Anecdote = ({text, points}) => (
  <>
  <div>{text}</div>
  <div>has {points} points</div>
  </>
)

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length))
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))
  const [maxPos, setMaxPos] = useState(0)

  const randomSelection = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const vote = () => {
    const copy = { ...points}
    copy[selected] += 1
    setPoints(copy)
    if (copy[selected] > points[maxPos]) {
      setMaxPos(selected)
    }
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} points={points[selected]} />
      <Button onClick={vote} text="vote" />
      <Button onClick={randomSelection} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote text={anecdotes[maxPos]} points={points[maxPos]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)