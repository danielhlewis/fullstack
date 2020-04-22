import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonList from './components/PersonList'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personService
		.getAll()
			.then(persons => {
			setPersons(persons)
		})
  }, [])
  console.log('render', persons.length, 'persons')

  const deletePerson = (id) => {
    if (window.confirm(`Delete ${persons.find((x) => x.id === id).name}?`)) {
      personService
      .remove(id)
      .then(
        setPersons(persons.filter((x) => x.id !== id))
      )
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} className="notification" />
      <Notification message={errorMessage} className="error" />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm newName={newName} setNewName={setNewName}
                  newNumber={newNumber} setNewNumber={setNewNumber}
                  persons={persons} setPersons={setPersons}
                  setNotificationMessage={setNotificationMessage}
                  setErrorMessage={setErrorMessage}
      />
      <h2>Numbers</h2>
      <PersonList persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App