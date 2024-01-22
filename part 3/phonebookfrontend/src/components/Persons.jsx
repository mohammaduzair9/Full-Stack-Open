const Persons = ({ personsToShow, handleDelete }) => {

  return (
    <div>
      {personsToShow.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}> delete </button>
        </div>  
        )}
    </div>
  )
}

export default Persons