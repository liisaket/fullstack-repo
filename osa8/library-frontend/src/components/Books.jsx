import { useEffect, useState } from 'react'

const Books = ({ show, books }) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    if (books) {
    setFiltered(books)
  }}, [books])

  if (!show || !books) {
    return null
  }
 
  const allGenres = books.map((book) => book.genres)
  const genres = [...new Set(allGenres.flat())]

  const handleChange = (event) => {
    setGenreFilter(event.target.value)
    event.target.value === ''
      ? setFiltered(books)
      : setFiltered(books.filter(
        book => book.genres.includes(event.target.value)))
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
          {filtered.map((book) => (
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