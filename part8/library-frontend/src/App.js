
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import {
  useQuery, useLazyQuery, useMutation, useSubscription, useApolloClient
} from '@apollo/client'
import { BOOK_ADDED, AUTHOR_ADDED, ALL_AUTHORS, ALL_BOOKS, FAVORITE_GENRE } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()
  const [getGenre, genreResult] = useLazyQuery(FAVORITE_GENRE)
  
  useEffect(() => {
    const savedToken = window.localStorage.getItem('library-user-token')
    if (savedToken) {
      setToken(savedToken)
      getGenre()
    }
  }, [])

  const login = (token) => {
    setToken(token)
    getGenre()
  }

  const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)

  const updateAuthorCacheWith = (addedAuthor) => {
    console.log("updating author cache")
    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      const authorforCache = {...addedAuthor, bookCount: 1}
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          ...dataInStore,
          allAuthors: [ ...dataInStore.allAuthors, authorforCache ]
        }
      })
    }
  }

  const updateBookCacheWith = (addedBook) => {
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [ ...dataInStore.allBooks, addedBook ]
        }
      })
    }
    const genres = addedBook.genres
      genres.map(genre => {
        try {
          const dataInStore = client.readQuery({ query: ALL_BOOKS, variables: {genre: genre} })
          if (!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
              query: ALL_BOOKS,
              variables: {genre: genre},
              data: {
                ...dataInStore,
                allBooks: [ ...dataInStore.allBooks, addedBook ]
              }
            })
          }
        } catch (exception) {

        }
      })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateBookCacheWith(addedBook)
    }
  })

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      notify(`${addedAuthor.name} added`)
      updateAuthorCacheWith(addedAuthor)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (token && page === 'login') {
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { !token ?
          <button onClick={() => setPage('login')}>login</button>
          :
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={logout}>logout</button>
          </>
        }
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        showSetBirthyear={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        updateBookCacheWith={updateBookCacheWith}
        updateAuthorCacheWith={updateAuthorCacheWith}
      />

      <Recommended
        show={page === 'recommended'}
        genreResult={genreResult}
      />

      <LoginForm
        show={page === 'login'}
        setToken={login}
        setError={notify}
      />

    </div>
  )
}

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default App