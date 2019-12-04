import React, { useState } from 'react'


const Blog = ({ blog, updateLikes, deleteBlog }) => {

  const [blogVisible, setBlogVisible] = useState(false)
  //const [divNotVisible, setDivNotVisible] = useState(false)


  const toggleVisibility = () => {
    setBlogVisible(!blogVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  /*
  const hiddenStyle = {
    display: 'none'
  }
*/
  if (blogVisible === true) {

    return (


      <div style={blogStyle} onClick={toggleVisibility} id={blog._id}>

        {blog.title} {blog.author} <br />
        {blog.url} <br />
        {blog.likes}

        <button type="submit" onClick={updateLikes}> like </button><br />

        <p>Added by {blog.user.name}</p>
        <button type="submit" onClick={deleteBlog}> Delete blog </button><br />

      </div>


    )
  }
  return (
    <div>
      <div style={blogStyle}>
        <div onClick={toggleVisibility} >

          {blog.title} {blog.author}

        </div>
      </div>
    </div>
  )

}

export default Blog