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
    </div>)
  }

  
const App = () => {
  const [countryFilter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log("fetching all countries")
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      console.log("all countries fetched")
    })
  }, [])

  const showCountries =
    countryFilter.length === 0
      ? []
      : countries.filter(
          c => c.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

  const handleChange = (event) => {
    setFilter(event.target.value)
    ///console.log(countries)
  }

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleChange}/>
    {showCountries.map(c => <CountryName key={c.capitalInfo.latlng} name={c.name.common}/>)}
    </div>
  )
}

export default App