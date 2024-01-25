import { useDispatch } from 'react-redux'
import { Table } from 'react-bootstrap'
import { setNotification } from '../reducers/notifReducer'
import { removeComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const remove = async (blog, comment, index) => {
    if (window.confirm(`sure you want to remove comment "${comment}"?`)) {
      dispatch(removeComment({ id: blog.id, index: index }))
      dispatch(setNotification(`removed comment '${comment}'`))
    }
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {blog.comments.map((comment, index) => {
            return (
              <tr key={index}>
                <td>&quot;{comment}&quot;&nbsp;
                  <button onClick={() => remove(blog, comment, index)}>delete</button>
                </td>
              </tr>
            )}
          )}
        </tbody>
      </Table>
    </div>
  )}

export default Comments