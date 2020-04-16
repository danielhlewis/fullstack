import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import Filter from './components/Filter'

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY
  const query=`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

  useEffect(() => {
    console.log('effect')
    axios
      .get(query)
      .then(response => {
        console.log('promise fulfilled')
        console.log(response)
        if (response.status === 200) {
          setWeather(response.data)
        }
      })
  }, [query])

  if (weather === null) {
    return null;
  } else {
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <div>temperature: {weather.current.temperature} Celcius</div>
        <img src={weather.current.weather_icons} alt="icon"/>
        <div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </div>
    )
  }
  
}

const LanguageList = ({languages}) => (
  <ul>
    {languages.map((l) => <li key={l.iso639_1}>{l.name}</li>) }
  </ul>
)

const CountryInfo = ({country}) => (
  <div>
    <h1>{country.name}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <LanguageList languages={country.languages} />
    <img src={country.flag} alt="flag" width={150} height={150} />
    <Weather capital={country.capital} />
  </div>
)

const CountryList = ({countries, setFilter}) => {

  console.log(`${countries.length} countries survived filter`)
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map((country) => 
      <div key={country.name}>
        {country.name}
        <button onClick={() => setFilter(country.name)}>
          show
        </button>
      </div>)
  } else if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />
  } else {
    return null;
  }
}

const App = () => {
  const [ filter, setFilter ] = useState('')
  console.log(`Filter: ${filter}`)

  const [ countries, setCountries ] = useState([])
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('fetched', countries.length, 'countries')
  
  


  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}/>
      <CountryList countries={countries.filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()))}
                   setFilter={setFilter}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)