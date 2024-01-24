import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import { setNotification } from '../reducers/notifReducer'
import { likeBlog } from '../reducers/blogReducer'
import Comment from './Comment'
import Comments from './Comments'

const Blog = ({ blogs }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  const user = useSelector(state => {
    return state.user})

  if (!blog || !user) {
    return null
  }

  const like = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`a like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'danger'))
    }
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <Table striped>
        <tbody>
          <tr>
            <th>title</th>
            <td>{blog.title}</td>
          </tr>
          <tr>
            <th>author</th>
            <td>{blog.author}</td>
          </tr>
          <tr>
            <th>URL</th>
            <td> <a href={blog.url}>{blog.url}</a> </td>
          </tr>
          <tr>
            <th>likes</th>
            <td>{blog.likes}&nbsp;
              <button onClick={() => like(blog)}>like</button>
            </td>
          </tr>
          <tr>
            <th>added by</th>
            <td>{blog.user.username}
            </td>
          </tr>
        </tbody>
      </Table>
      <h3>comments</h3>
      <Comment blog={blog} />
      <Comments blog={blog} />
    </div>
  )}

export default Blog