import React, { useState } from 'react'
import { ALL_AUTHORS, SET_BORN } from '../queries'
import { useQuery, useMutation } from '@apollo/client'

const BornForm = ({ authorNames }) => {
  const [name, setName] = useState(authorNames.length > 0 ? authorNames[0] : '')
  const [year, setYear] = useState('')

  const [ setBorn, result ] = useMutation(SET_BORN)

  const submit = async (event) => {
    event.preventDefault()

    setBorn({ variables: { name, setBornTo: parseInt(year) } })

    setName('')
    setYear('')
  }

  const handleChange = (event) => {
    console.log(event)
    setName(event.target.value)
  }

  if (authorNames.length === 0) {
    return null
  }

  return (
    <div>
      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <select onChange={handleChange}>
          {authorNames.map(authorName => 
            <option value={authorName} key={authorName}>
              {authorName}
            </option>)}
        </select>
        <div>
          year <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors



  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      { props.showSetBirthyear ? 
        <BornForm authorNames = {authors.map(a => a.name)} />
        :
        <div/>
      }
    </div>
  )
}

export default Authors
