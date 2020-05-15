import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    id,
    name,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query finAllBooks($genre: String){
  allBooks(
    genre: $genre
  ) {
    id,
    title,
    author {
      name
    }
    published,
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

export const SET_BORN = gql`
mutation setBirthYear($name: String!, $setBornTo: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $setBornTo
  ) {
    name
    born
    id
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
query {
  me {
    favoriteGenre
  }
}
`