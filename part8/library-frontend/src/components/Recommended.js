import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'


const Recommended = ({genreResult, show}) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    console.log('useEffect: genre')
    console.log(genreResult)
    if (!genreResult.loading && genreResult.data && genreResult.data.me) {
      const favGenre = genreResult.data.me.favoriteGenre
      console.log('favGenre')
      console.log(favGenre)
      setGenre(favGenre)
      getBooks({ variables: {genre: favGenre}})
    } else {
      console.log('not me')
    }
  }, [genreResult])

  useEffect(() => {
    console.log('useEffect: books')
    if (genre) {
      console.log(genre)
      console.log(booksResult)
      if (booksResult.data) {
        setBooks(booksResult.data.allBooks)
      }
    }
  }, [booksResult])

  if (!show) {
    return null
  }

  if (genreResult.loading) {
    return <div>loading...</div>
  }

  if (booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommended</h2>
      <div>books in your favorite genre <span>{genre}</span></div>
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
