import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  useEffect(() => {
    personService
      .getAllPersons()
      .then( initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleAddPerson = (event) => {
    event.preventDefault()

    const person = persons.find(person => person.name === newName)
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

        const updatedPerson = {...person, number : newNumber}
        personService
          .updatePerson(person.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
          })
      }
    }
    else{
      const newPersonObject = {
        name: newName,
        number: newNumber,
        id: (persons.length+1).toString()
      }

      personService
        .createPerson(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        
    }
  }

  const handleDelete = (person) => {
    
    if (window.confirm(`Delete "${person.name}" ?`)) {
      personService
        .deletePerson(person.id)
        .then(deletedPerson => {
          console.log(`Person with id ${deletedPerson.id} removed successfully`);
          setPersons(persons.filter(person => person.id != deletedPerson.id))
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setFilterName(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleNameFilter}></Filter>

      <h3>Add a new</h3>
      <PersonForm handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
    
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App