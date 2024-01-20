import { useState } from 'react'

const Display = ({ text, value }) => <div>{text} {value}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + bad + neutral
    const updatedAverage = (updatedGood - bad)/ updatedTotal
    const updatedPositive = (updatedGood / updatedTotal) * 100

    setGood(updatedGood)
    setTotal(updatedTotal) 
    setAverage(updatedAverage) 
    setPositive(updatedPositive)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedTotal = good + updatedBad + neutral
    const updatedAverage = (good - updatedBad)/ updatedTotal
    const updatedPositive = (good / updatedTotal) * 100

    setBad(updatedBad)
    setTotal(updatedTotal) 
    setAverage(updatedAverage) 
    setPositive(updatedPositive)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = good + bad + updatedNeutral
    const updatedAverage = (good - bad)/ updatedTotal
    const updatedPositive = (good / updatedTotal) * 100

    setNeutral(updatedNeutral)
    setTotal(updatedTotal) 
    setAverage(updatedAverage) 
    setPositive(updatedPositive)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text="good" />
      <Button onClick={handleNeutralClick} text="neutral" />
      <Button onClick={handleBadClick} text="bad" />

      <h1>statistics</h1>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
      <Display text="all" value={total} />
      <Display text="average" value={average} />
      <Display text="positive" value={positive + " %"} />
    </div>
  )
}

export default App