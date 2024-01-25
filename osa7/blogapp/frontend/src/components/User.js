import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import userService from '../services/users'
import { setNotification } from '../reducers/notifReducer'
import { removeBlog } from '../reducers/blogReducer'


const User = ({ online }) => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])
  const id = useParams().id
  const user = users.find(user => user.id === id)
  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [users])

  if (!online || !user) {
    return null
  }

  const remove = async (blog) => {
    if (window.confirm(`sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(removeBlog(blog))
    }
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <Table striped>
        <thead>
          <tr>
            <th>added blogs</th>
            <th>author</th>
            <th>likes</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.sort(byLikes).map(blog => {
            return (
              <tr key={blog.id}>
                <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
                <td>{blog.author}</td>
                <td>{blog.likes}</td>
                <td>{online && blog.user===online.id&&
                <button onClick={() => remove(blog)}>delete blog</button>}</td>
              </tr>
            )}
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default User