import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import BlogForm from './BlogForm'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const user = useSelector(state => {
    return state.user})

  if (!user) {
    return (
      <div>
        <p>log in first</p>
      </div>
    )
  }

  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes

  return (
    <div>
      <BlogForm />
      <Table striped>
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

export default BlogList