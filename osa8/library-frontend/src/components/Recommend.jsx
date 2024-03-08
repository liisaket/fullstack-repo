import { USER, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
  const user = useQuery(USER)
  const favGenre = user.data?.me?.favoriteGenre || null
  const genrebooks = useQuery(ALL_BOOKS, { variables: { genre: favGenre }})

  if (!props.show || !user.data.me) {
    return null
  }

  if (genrebooks.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{favGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {genrebooks.data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend