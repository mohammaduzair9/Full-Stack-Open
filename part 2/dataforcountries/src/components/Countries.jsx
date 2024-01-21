const Countries = ({ countriesToShow }) => {
  return (
    <div>
    {countriesToShow.map(country => 
      <div key={country.name.common}>
        {country.name.common}
      </div>  
      )}
  </div>
  )
}
  

export default Countries