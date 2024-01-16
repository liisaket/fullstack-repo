import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  const tdstyle = {
    paddingRight: 8,
    borderWidth: 1,
  }

  return (
    <div>
      <h2>users</h2>
      <table>
        <thead>
          <tr>
            <th>{null}</th>
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
      </table>
    </div>
  )
}

export default Users