import React from 'react'

const PersonList = ({persons, filter, deletePerson}) => {
	const namesToShow = 
	  persons.filter(x => x.name.toLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
  
	return (
	  <>
	  {namesToShow.map(person => 
	  	<div key={person.name}>
			{person.name} {person.number}
			<button onClick={() => deletePerson(person.id)}>delete</button>
		</div>)}
	  </>
	)
}

export default PersonList