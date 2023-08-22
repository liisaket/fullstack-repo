import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = ({ name, displayC, setFiltered }) => {
  const nameStyle = {
    marginLeft: '0px',
    padding: '0px'
  }
  return (
    <div>
      <p style={nameStyle}>
        {name} <button onClick={() =>
          setFiltered(displayC.filter(
          c => c.name.common.toLowerCase().includes(name.toLowerCase())))}>
          show</button></p>
    </div>
  )
}

const CountryDetails = (props) => {
  const nameStyle = {
    margin: '0px',
    padding: '0px'
  }
  const langStyle = {
    marginLeft: '0px',
    padding: '0px',
    fontWeight: 'bold'
  }
  const { name, capital, area, 
          languages, flag } = props
  return (
    <div>
      <h2>{name}</h2>
      <p style={nameStyle}>
        capital {capital}<br></br>
        area {area}</p>
      <p style={langStyle}>
        languages:</p>
      <ul>
        {Object.entries(languages).map(([key, value]) =>
          <li key={value}>
            {value}</li>)}
      </ul>
      <img src={flag} alt='flag' height='150px'/>
    </div>
  )
}

const DisplayCountries = (props) => {
  const {handleChange, displayC, setFiltered } = props
  return (
    displayC.length >= 10
      ? <p>Too many matches, please specify another filter</p>
    : displayC.length === 1
      ? displayC.map(c =>
        <CountryDetails key={c.name.common}
          name={c.name.common} capital={c.capital}
          area={c.area} languages={c.languages}
          flag={c.flags.png}
          onChange={handleChange}/>)
    : displayC.map(c =>
      <CountryName key={c.name.common}
        name={c.name.common}
        displayC={displayC}
        setFiltered={setFiltered}
        onChange={handleChange}/>)
  )
}
  
const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredC, setFiltered] = useState([])

  useEffect(() => {
    console.log("fetching all countries")
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      console.log("all countries fetched")
    })
  }, [])

  const handleChange = (event) => {
    event.target.value === ""
      ? setFiltered([])
      : setFiltered(countries.filter(
        c => c.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      find countries <input onChange={handleChange}/>
    <DisplayCountries handleChange={handleChange} displayC={filteredC}
    setFiltered={setFiltered}/>
    </div>
  )
}

export default App