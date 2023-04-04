import { useState } from 'react'

const Statistics = ({good, neutral, bad, all}) => {
      if (all === 0) {
        return (
          <div>
            <h1>statistics</h1>
            <p>No feedback given</p>
          </div>
        )
      }
      return (
        <div>
          <h1>statistics</h1>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {all}</p>
          <p>average {(good*1+neutral*0+bad*-1)/all}</p>
          <p>positive {(good/all)*100} %</p>
    </div>
  )  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good={good} neutral={neutral} bad={bad} all={good+neutral+bad}/>
    </div>
  )
}

export default App