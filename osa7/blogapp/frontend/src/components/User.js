import { useParams } from 'react-router-dom'

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(user => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => {
          return (
            <div key={blog.id}>
              <li>{blog.title}</li>
            </div>
          )}
        )}
      </ul>
    </div>
  )
}

export default User