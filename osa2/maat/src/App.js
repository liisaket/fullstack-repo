import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryName = ({ name }) => {
  const nameStyle = {
    margin: '0px',
    padding: '0px'
  }
  return (
    <div>
      <p style={nameStyle}>
        {name}</p>
    </div>
  )
}

const DisplayCountries = ({ handleChange, displayC }) => {
  const countries = 
    displayC.map(c =>
      <CountryName key={c.name.common} name={c.name.common} onChange={handleChange}/>)
  console.log(countries)
  return (
    countries.length >= 10
      ? <p>Too many matches, please specify another filter</p>
    : countries
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
    <DisplayCountries handleChange={handleChange} displayC={filteredC}/>
    </div>
  )
}

export default App