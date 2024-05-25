import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import AddPost from './components/AddPost';
import SinglePost from './components/SinglePost';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    // Redirect to login page after logout
    window.location.href = '/login';
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">Blog</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link to="/add" className="nav-link">Add Post</Link>
                    </li>
                    <li className="nav-item">
                      <button onClick={handleLogout} className="btn btn-link nav-link">Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/signup" className="nav-link">Signup</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" replace /> : <Login setLoggedIn={setLoggedIn} />}
          />
          {isLoggedIn && (
            <>
              <Route path="/add" element={<AddPost />} />
              <Route path="/posts/:id" element={<SinglePost />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
