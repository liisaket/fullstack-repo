import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const comment = useField('text')

  const onCreate = (event) => {
    event.preventDefault()
    dispatch(commentBlog({ ...blog, comment: comment.value }))
      .then(result => {
        if (result) {
          comment.onReset()
        }
      })
  }

  return (
    <div>
      <form onSubmit={onCreate}>
        <div>
          <input {...comment}/>
          <button id='comment-button' type="add">add a comment</button>
        </div>
      </form>
      <br></br>
    </div>
  )}

export default CommentForm