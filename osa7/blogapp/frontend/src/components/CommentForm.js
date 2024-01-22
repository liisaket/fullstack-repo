import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { commentBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notifReducer'
import Togglable from './Togglable'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()
  const commentFormRef = useRef()
  const comment = useField('text')

  const onCreate = (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog({ ...blog, comment: comment.value }))
      dispatch(setNotification('added a new comment'))
      comment.onReset()
      commentFormRef.current.toggleVisibility()
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  return (
    <div>
      <Togglable buttonLabel='add a comment' ref={commentFormRef}>
        <h3>add a comment</h3>
        <form onSubmit={onCreate}>
          <div>
            comment:
            <input {...comment}/>
          </div>
          <button id='comment-button' type="add">add</button>
        </form>
      </Togglable>
    </div>
  )}

export default CommentForm