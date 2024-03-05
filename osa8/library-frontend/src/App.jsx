import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Notify from './components/Notify'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  const books = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (books.loading)  {
    return <div>loading...</div>
  }

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
  }

  return (
    <div>
      <div>
        <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ? <span>
          <button onClick={() => setPage('login')}>login</button></span>
          : <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </span>
        }
      </div>

      <Authors show={page === 'authors'} token={token} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} />

    </div>
  )
}

export default App