import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

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
  const [weather, setWeather] = useState([])
  const { name, capital, area, 
          languages, flag, latlng } = props

  const url =
  `https://api.openweathermap.org/data/2.5/weather?lat=`
    + `${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${api_key}`
  
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setWeather(response.data)
    })
  }, [])

  if (weather.length === 0) {
    return null
    } else {
    const wurl =
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
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
        <img src={flag} alt='flag' height='130px'/>
        <h3>Weather in {capital}</h3>
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={wurl} alt='icon'/>
        <p>wind {weather.wind.speed} ms/s</p>
      </div>
    )
  }
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
          flag={c.flags.png} latlng={c.latlng}
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