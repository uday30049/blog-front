import React, { useState } from 'react';
import axios from 'axios';

function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleAddPost = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log(token)
      const user = JSON.parse(atob(token.split('.')[1])); // Decoding the token to get the user data
      const { id: authorId } = user;
      await axios.post(
        'http://localhost:5000/api/posts',
        { title, content, authorId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTitle('');
      setContent('');
      setError('');
      // Redirect to home page after successful post creation
      window.location.href = '/';
    } catch (error) {
      setError(error.response ? error.response.data.error : 'Failed to add post');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4 mb-3">Add Post</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleAddPost}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                className="form-control"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Post</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
