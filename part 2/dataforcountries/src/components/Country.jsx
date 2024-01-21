const Country = ({ country }) => {

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
    </div>
  )
}

export default Country