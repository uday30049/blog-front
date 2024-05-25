import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPosts();
    checkLoginStatus();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  };

  const handleReadMore = (postId) => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      navigate(`/posts/${postId}`);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">Blogs to read</h2>
      {posts.map((post) => (
        <div key={post._id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">Author: {post.author.username}</p>
            <button onClick={() => handleReadMore(post._id)} className="btn btn-primary">
              Read More!
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
