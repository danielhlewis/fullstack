import React from 'react'

import personService from '../services/persons'

const PersonForm = ( {newName, setNewName, newNumber, setNewNumber, persons, setPersons, setNotificationMessage, setErrorMessage}) => {
	const addPerson = (event) => {
		event.preventDefault()

		const oldPersons = persons.filter(x => x.name === newName)
		console.log(`Existing persons: ${oldPersons}`)
		if (oldPersons.length === 0) {
			const personObject = {
				name: newName,
				number: newNumber
			}

			personService
			.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
				setNewName('')
				setNewNumber('')
				setNotificationMessage(
					`Added '${returnedPerson.name}'`
				)
				setTimeout(() => {
					setNotificationMessage(null)
				}, 5000)
			})
		} else {
			const oldPerson = oldPersons[0]
			if (window.confirm(`${newName} is already added to the phonebook, replace the old number with the new one?`)) {
				const newPerson = { ...oldPerson, number: newNumber}
				console.log("Updating ", newPerson)
				personService
				.update(newPerson.id, newPerson)
				.then(returnedPerson => {
					setPersons(persons.map(x => x.id === returnedPerson.id ? returnedPerson : x))
					setNewName('')
					setNewNumber('')
					setNotificationMessage(
						`Updated ${newPerson.name}'s number`
					)
					setTimeout(() => {
						setNotificationMessage(null)
					}, 5000)
				})
				.catch(error => {
					setErrorMessage(
						`Information of ${newPerson.name} has already been removed from the system`
					)
					setTimeout(() => {
						setErrorMessage(null)
					}, 5000)
				})
			}
		}
	}

	const handleNameChange = (event) => {
			setNewName(event.target.value)
	}

	const handleNumberChange = (event) => {
			setNewNumber(event.target.value)
	}

	return (
		<form onSubmit={addPerson}>
		<div>
			name: <input value={newName} 
					onChange={handleNameChange}	
				/>
		</div>
		<div>
			number: <input value={newNumber} 
					onChange={handleNumberChange}	
				/>
		</div>
		<div>
			<button type="submit">add</button>
		</div>
		</form>
	)
}

export default PersonForm