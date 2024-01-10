import { useState } from 'react'

const Blog = ({ blog, like, remove, canRemove }) => {
  const [visible, setVisible] = useState(false)

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <div style={style}>
        <div>
          <i>{blog.title}</i> by {blog.author} <button onClick={() => setVisible(!visible)}>
            {visible ? 'hide' : 'show'}</button>
        </div>
        {visible&&
          <div>
            <div> <a href={blog.url}>{blog.url}</a> </div>
            <div>likes {blog.likes} <button onClick={like}>like</button></div>
            <div>{blog.user && blog.user.name}</div>
            {canRemove&&<button onClick={remove}>delete</button>}
          </div>
        }
      </div>
    </div>
  )}

export default Blog