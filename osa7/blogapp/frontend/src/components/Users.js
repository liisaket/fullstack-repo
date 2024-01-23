import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  const user = useSelector(state => {
    return state.user})

  if (!user) {
    return (
      <div>
        <p>log in first</p>
      </div>
    )
  }

  const tdstyle = {
    paddingRight: 8,
    borderWidth: 1,
  }

  return (
    <div>
      <h2>users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => {
            return (
              <tr key={user.id}>
                <td style={tdstyle}>
                  <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                <td style={tdstyle}>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default Users