import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState([])
  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const toggleGenre = (value) => {
    const genre = value.genre
    if (genreFilter.includes(genre)) {
      setGenreFilter(genreFilter.filter(g => g !== genre))
    } else {
      setGenreFilter([...genreFilter, genre])
    }
  }

  const books = result.data.allBooks

  const genres = [...new Set(books.map(book => book.genres).flat())]
  // const booksToShow = books.filter(book => book.genres.filter(genre => genreFilter.includes(genre)).length > 0)
  const booksToShow = books.filter(book => genreFilter.filter(genre => !book.genres.includes(genre)).length === 0)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(genre => genreFilter.includes(genre) ?
          <button 
            style={{backgroundColor: 'yellow'}}
            key={genre}
            onClick={() => toggleGenre({genre})}>
            {genre}
          </button>
          :
          <button 
            key={genre}
            onClick={() => toggleGenre({genre})}>
            {genre}
          </button>)
        }
      </div>
    </div>
  )
}

export default Books