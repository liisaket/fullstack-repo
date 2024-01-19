import Blog from './Blog2'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogList = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const user = useSelector(state => {
    return state.user})

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

  /*{[...blogs].sort(byLikes).map(blog =>
    <Blog key={blog.id} blogs={blogs}
      like={() => like(blog)} remove={() => remove(blog)}
      canRemove={user && blog.user.username===user.username}/>
  )}*/

  return (
    <div>
      {user && <div>
        {[...blogs].sort(byLikes).map(blog => {
          return (
            <div key={blog.id} style={style}>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </div>
          )}
        )}
      </div>}
    </div>
  )}

export default BlogList