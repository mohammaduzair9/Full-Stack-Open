const Persons = ({ personsToShow }) => {

  return (
    <div>
      {personsToShow.map(persons => <p key={persons.id}>{persons.name} {persons.number}</p>)}
    </div>
  )
}

export default Persons