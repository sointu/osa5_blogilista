import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new blog</h2>
            Title:
      <input
        type="text"
        value={newTitle}
        onChange={handleTitleChange}
      />
      <br />
            Author:
      <input
        input="type"
        value={newAuthor}
        onChange={handleAuthorChange}
      />
      <br />
            Url:
      <input
        type="text"
        value={newUrl}
        onChange={handleUrlChange}
      />
      <br />
      <button type="submit">create</button>
    </form>)
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newTitle: PropTypes.string,
  newAuthor: PropTypes.string,
  newUrl: PropTypes.string
}

export default BlogForm