import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchPost();
  }, []); // Add an empty dependency array to ensure useEffect runs only once

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data);
      setEditedTitle(response.data.title);
      setEditedContent(response.data.content);
    } catch (error) {
      console.error('Error fetching post', error);
    }
  };

  const handleEditPost = async () => {
    setIsEditing(true);
  };

  const handleSavePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/posts/${id}`,
        { title: editedTitle, content: editedContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setIsEditing(false);
      navigate('/');
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPost(null);
      // Navigate to home page after successful post deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };
  const getUserId = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.id;
    }
    return null;
  };

  // Check if the user is the author of the post
  const isAuthor = post && post.author._id === getUserId();

  // Function to get the user ID from the token
  

  return (
    <div className="container">
      {post ? (
        <div>
          {isEditing ? (
            <div>
              <div className="mb-3">
                <h2>Edit post</h2>
                <label htmlFor="title" className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="content" className="form-label">Content</label>
                <textarea
                  id="content"
                  className="form-control"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
              </div>
              <button onClick={handleSavePost} className="btn btn-primary">
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="mt-4 mb-3">{post.title}</h2>
              <p className="mb-3">Author: {post.author.username}</p>
              <p>{post.content}</p>
              {isAuthor && (
                <button onClick={handleEditPost} className="btn btn-primary me-2">
                  Edit Post
                </button>
              )}
              {isAuthor && (
                <button onClick={handleDeletePost} className="btn btn-danger">
                  Delete Post
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SinglePost;
