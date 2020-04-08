import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({ text }) => (
  <h1> { text } </h1>
)
const Button = ({ onClick, text}) => (
  <button onClick={ onClick }>
    { text }
  </button>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad
  if (all === 0) {
    return (
      <>
        <Header text="statistics" />
        <div>No feedback given</div>
      </>
    )
  }
  let average = (good - bad) / all
  let positive = (good / all) * 100
  return (
  <>
    <Header text="statistics" />
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={all} />
        <Statistic text="average" value={average} />
        <Statistic text="positive" value={positive+"%"} />
      </tbody>
    </table>
  </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={ () => setGood(good + 1) } text="good" />
      <Button onClick={ () => setNeutral(neutral + 1) } text="neutral" />
      <Button onClick={ () => setBad(bad + 1) } text="bad" />
      <Statistics good={ good } neutral={neutral} bad={bad} />
    </div>

  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)