import { useState, useEffect } from 'react'

import countryService from './services/countries'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filterCountry, setFilterCountry] = useState('')

  useEffect(() => {
    countryService
      .getAllCountries()
      .then( countries => {
        setCountries(countries)
      })
  }, [])

  const handleCountryFilter = (event) => {
    setFilterCountry(event.target.value)
  }

  const handleSelectedCountry = (country) => {
    setFilterCountry(country)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterCountry.toLowerCase()))

  let countryData = null
  if (countriesToShow.length >= 10) {
    countryData = <div>Too many matches, specify another filter</div>
  }
  else if (countriesToShow.length > 1) {
    countryData = <Countries countriesToShow={countriesToShow} handleSelectedCountry={handleSelectedCountry}/>
  }
  else if (countriesToShow.length === 1){
    countryData = <Country country={countriesToShow[0]} />
  }

  return (
    <div>
      <Filter value={filterCountry} handleFilter={handleCountryFilter} />
      {countryData}
    </div>
  )
}

export default App