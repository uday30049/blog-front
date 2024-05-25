import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/signup', { username, password });
      setUsername('');
      setPassword('');
      setError('');
      // Redirect to login page after successful signup
      window.location.href = '/login';
    } catch (error) {
      setError('Failed to sign up');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4 mb-3">Signup</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
