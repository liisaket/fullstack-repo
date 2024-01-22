import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

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