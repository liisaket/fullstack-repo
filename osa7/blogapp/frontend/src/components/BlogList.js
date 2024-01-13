import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = ({ user }) => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const byLikes = (blog1, blog2) => blog2.likes - blog1.likes
  const dispatch = useDispatch()

  const like = async (blog) => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`a like for the blog '${blog.title}' by '${blog.author}'`))
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  const remove = async (blog) => {
    try {
      if (window.confirm(`sure you want to remove blog ${blog.title} by ${blog.author}?`)) {
        dispatch(removeBlog(blog))
        dispatch(setNotification(`removed blog '${blog.title}' by ${blog.author}`))
      }
    } catch (exception) {
      dispatch(setNotification(`${exception}`, 'error'))
    }
  }

  return (
    <div>
      {[...blogs].sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog}
          like={() => like(blog)} remove={() => remove(blog)}
          canRemove={user && blog.user.username===user.username}/>
      )}
    </div>
  )}

export default BlogList