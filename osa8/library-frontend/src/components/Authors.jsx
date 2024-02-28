import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR)

  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }

  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({  variables: { 
      name: name, 
      year: Number(year) } })
    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        name
        <select value={name} onChange={({ target }) => setName(target.value)}>
          {result.data.allAuthors.map((a) => {
            if (a.born === null) {
              return (
                <option key={a.id} value={a.name}>{a.name}</option>
          )}})}
        </select>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">set year</button>
      </form>
    </div>
  )
}

export default Authors