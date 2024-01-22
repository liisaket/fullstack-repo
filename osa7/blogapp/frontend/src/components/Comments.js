import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { removeComment } from '../reducers/blogReducer'

const BlogList = ({ blog }) => {
  const dispatch = useDispatch()

  const removeC = async (blog, comment, index) => {
    try {
      dispatch(removeComment({ id: blog.id, index: index }))
      dispatch(setNotification(`removed comment ${comment}`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  return (
    <div>
      <ul>
        {blog.comments.map((comment, index) => {
          return (
            <div key={index}>
              <li>{comment}&nbsp;
                <button onClick={() => removeC(blog, comment, index)}>delete</button>
              </li>
            </div>
          )}
        )}
      </ul>
    </div>
  )}

export default BlogList