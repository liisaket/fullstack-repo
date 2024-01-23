import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')

  const onCreate = (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog({ ...blog, comment: comment.value }))
      dispatch(setNotification('added a new comment'))
      comment.onReset()
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'danger'))
    }
  }

  return (
    <div>
      <form onSubmit={onCreate}>
        <div>
          <input {...comment}/>
          <button id='comment-button' type="add">add a comment</button>
        </div>
      </form>
    </div>
  )}

export default CommentForm