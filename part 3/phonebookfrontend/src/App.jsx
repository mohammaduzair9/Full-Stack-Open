import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notiification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notification, setNotification] = useState(null)
  const [eventSuccess, setEventSuccess] = useState(1)

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
            setNotification(`Updated ${returnedPerson.name}`)
            setEventSuccess(1)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification(error.response.data.error)
            setEventSuccess(0)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    }
    else{
      const newPersonObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .createPerson(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(`Added ${returnedPerson.name}`)
          setEventSuccess(1)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(error.response.data.error)
          setEventSuccess(0)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        
    }
  }

  const handleDelete = (person) => {
    
    if (window.confirm(`Delete "${person.name}" ?`)) {
      personService
        .deletePerson(person.id)
        .then(deleteResponse => {
          setPersons(persons.filter(p => p.id != person.id))
          setNotification(`Person with id ${person.id} removed successfully`)
          setEventSuccess(1)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setNotification(error.response.data.error)
          setEventSuccess(0)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
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
      <Notification message={notification} success={eventSuccess}/>

      <Filter handleFilter={handleNameFilter} />

      <h3>Add a new</h3>
      <PersonForm handleAddPerson={handleAddPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
    
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App