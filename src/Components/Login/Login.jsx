import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

const LOGIN_ENDPOINT = `${BACKEND_URL}/login-to-account`;

function Login() {
  const [user_id, setuser_id] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(LOGIN_ENDPOINT, {
        params: {
        "user_id": user_id,
        "password": password,
        }
       });
      console.log('Account created successfully:', response.data);
      navigate('/User');
    } catch (error) {
      console.log(user_id);
      console.log(password);
      console.error('There was an error logging in:', error);
      setError(error.response?.data?.message || 'Failed to login to account. Please try again.');
    }
  };
  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user_id">user_id:</label>
          <input
            type="text"
            id="user_id"
            value={user_id}
            onChange={(e) => setuser_id(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <br></br>
      <button onClick={() => window.location.href = '/createAccount'}>Create Account</button>
    </div>
  );
}

export default Login;