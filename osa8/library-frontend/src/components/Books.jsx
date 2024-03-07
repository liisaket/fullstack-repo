import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Books = ({ show, books }) => {
  const [genreFilter, setFilter] = useState('')

  const { loading, data, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: genreFilter }
  })

  useEffect(() => {
    refetch({ genre: genreFilter })
  })

  if (loading)  {
    return <div>loading...</div>
  }

  if (!show || !books) {
    return null
  }
 
  const allGenres = books.map((book) => book.genres)
  const genres = [...new Set(allGenres.flat())]

  const handleChange = (event) => {
    setFilter(event.target.value)
    refetch({ genre: genreFilter })
  }

  return (
    <div>
      <h2>books</h2>
      in genre: {genreFilter ? genreFilter : 'all genres'}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((genre) => {
        return (
          <button key={genre} value={genre} onClick={handleChange}>{genre}</button>)
      })}
      <button value={''} onClick={handleChange}>all genres</button>
    </div>
  )
}

export default Books