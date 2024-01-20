import { useState } from 'react'

const StatisticLine = ({ text, value }) => <div>{text} {value}</div>
const Button = ({ onClick, text }) => <button onClick={onClick}> {text} </button>

const Statistics = ({ good, bad, neutral, total, average, positive }) => {

  if (total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive + " %"} />
    </div>  
  )
  
}


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
      <Statistics good={good} bad={bad} neutral={neutral} total={total} average={average} positive={positive} />
    </div>
  )
}

export default App