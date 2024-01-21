const Countries = ({ countriesToShow, handleSelectedCountry }) => {
  return (
    <div>
    {countriesToShow.map(country => 
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleSelectedCountry(country.name.common)}> show </button>
      </div>  
      )}
  </div>
  )
}
  

export default Countries