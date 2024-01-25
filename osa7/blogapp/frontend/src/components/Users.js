import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import userService from '../services/users'

const Users = ({ user }) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })}, [users])

  if (!user) {
    return null
  }

  const tdstyle = {
    paddingRight: 8,
    borderWidth: 1,
  }

  const byBlogs = (user1, user2) => user2.blogs.length - user1.blogs.length

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
          {users.sort(byBlogs).map(user => {
            return (
              <tr key={user.id}>
                <td style={tdstyle}>
                  <Link to={`/users/${user.id}`}>{user.username}</Link></td>
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