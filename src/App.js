import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'

import Notification from './components/Notification'
import Success from './components/Success'

import BlogForm from './components/BlogForm'


function App(props) {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [blogFormVisible, setBlogFormVisible] = useState(false)


  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('ERROR: wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    // eslint-disable-next-line linebreak-style
    setSuccessMessage('You have logged out.')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs.sort((a,b) => {
          return (a.likes - b.likes)
        }))

      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    console.log(user)
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
      //user: user.user._id
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`A new blog called ${newTitle} was created by ${newAuthor}.`)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setUser(user)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage('ERROR: blog could not be created')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const updateLikes = (id) => {

    console.log('heippa updateLikes-funktiosta')
    const blog = blogs.find(b => b.id === id)
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes+1,
      user: blog.user
    }

    blogService
      .update(id, blogObject)
      .then(returnedBlogs => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlogs))
        setUser(user)
      })

      .catch(error => {
        setErrorMessage('ERROR: can\'t like this')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }

  const deleteBlog = (id) => {

    console.log('heippa delete-funktiosta')
    const blog = blogs.find(b => b.id === id)

    blogService
      .deleteBlog(id)
      .then(returnedBlogs => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlogs))
        setSuccessMessage(`The blog called ${blog.title} was deleted.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
        setUser(user)
      })

      .catch(error => {
        setErrorMessage('ERROR: can\'t delete this blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

  }



  const loginForm = () => (

    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => { setUsername(target.value) }}
            name="username"
          />
        </div>
        <div>
          password
          <input
            type="text"
            value={password}
            onChange={({ target }) => { setPassword(target.value) }}
            name="password"
          />
        </div>
        <button type="submit">submit</button>
      </form>
    </div>

  )

  const blogForm = () => {
    // näkyvyyden muuttaminen sen mukaan onko blogFormVisible false vai true
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenHidden = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => { setBlogFormVisible(true) }}>Create new blog</button>
        </div>
        <div style={showWhenHidden}>
          <BlogForm
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleSubmit={addBlog}
          />
          <button onClick={() => { setBlogFormVisible(false) }}>Cancel</button>
        </div>
      </div>
    )
  }



  return (
    <div>

      <Notification
        message={errorMessage}
      />
      <Success
        message={successMessage}
      />

      {user === null ?

        loginForm() :

        <div>
          <p>{user.name} is logged in
            <button type="submit" onClick={handleLogOut}>logout</button>
          </p>

          <h2>Blogs</h2>

          {blogs.map(blog =>

            <Blog
              key={blog.id} blog={blog} user={user} handleVisible={props.toggleVisibility}
              updateLikes={(e) => {e.stopPropagation(); updateLikes(blog.id)}}
              deleteBlog={(e) => {e.stopPropagation(); deleteBlog(blog.id)}}

            />

          )}

          {blogForm()}


        </div>
      }


    </div>
  )

}

export default App


