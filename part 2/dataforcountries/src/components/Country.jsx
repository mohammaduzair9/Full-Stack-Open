import { useState, useEffect } from 'react'

import weatherService from '../services/weather'

const Country = ({ country }) => {

  const [countryWeather, setCountryWeather] = useState(null)

  let weatherData = null

  useEffect(() => {
    weatherService
      .getCityWeather(country.capital)
      .then( weather => {
        setCountryWeather(weather)
      })
  }, [])

  if (countryWeather !== null) {
    weatherData = 
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>temperature {countryWeather.main.temp} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${countryWeather.weather[0].icon}@2x.png`} />
        <p>wind {countryWeather.wind.speed} m/s</p>
      </div>
  }

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      
      <h3>languages</h3>
      <ul>
        {Object.keys(country.languages).map((langKey) => (
          <li key={langKey}> {country.languages[langKey]} </li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      
      {weatherData}
    </div>
  )
}

export default Country