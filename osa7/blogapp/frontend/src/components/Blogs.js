import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const Blogs = ({ user }) => {
  const navigate = useNavigate()
  const blogs = useSelector(state => {
    return state.blogs
  })

  if (!user) {
    return null
  }

  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

  return (
    <div>
      <div>
        <button onClick={() => navigate('/create')}>add a new blog</button>
      </div>
      <br></br>
      <Table striped>
        <thead>
          <tr>
            <th>blogs</th>
          </tr>
        </thead>
        <tbody>
          {[...blogs].sort(byLikes).map(blog => {
            return (
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </td>
              </tr>
            )}
          )}
        </tbody>
      </Table>
    </div>
  )}

export default Blogs