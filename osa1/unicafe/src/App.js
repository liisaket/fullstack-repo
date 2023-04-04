import { useState } from 'react'

const StatisticLine = (props) => {
  const { good, neutral, bad, all } = props.value
  if (props.text === "average") {
    return (
      <div>
        <p>{props.text} {(good*1+neutral*0+bad*-1)/all}</p>
      </div>
    )
  }
  if (props.text === "positive") {
    return (
      <div>
        <p>{props.text} {(good/all)*100} %</p>
      </div>
    )
  }
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}


const Statistics = ({stats}) => {
  if (stats.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <StatisticLine text="good" value={stats.good} />
      <StatisticLine text="neutral" value={stats.neutral} />
      <StatisticLine text="bad" value={stats.bad} />
      <StatisticLine text="average" value={stats} />
      <StatisticLine text="positive" value={stats} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good+neutral+bad
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={stats}/>
    </div>
  )
}

export default App