import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { removeComment } from '../reducers/blogReducer'

const Comments = ({ blog }) => {
  const dispatch = useDispatch()

  const remove = async (blog, comment, index) => {
    try {
      dispatch(removeComment({ id: blog.id, index: index }))
      dispatch(setNotification(`removed comment '${comment}'`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'danger'))
    }
  }

  return (
    <div>
      <ul>
        {blog.comments.map((comment, index) => {
          return (
            <div key={index}>
              <li>{comment}&nbsp;
                <button onClick={() => remove(blog, comment, index)}>delete</button>
              </li>
            </div>
          )}
        )}
      </ul>
    </div>
  )}

export default Comments