import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const CREATE_ACCOUNT_ENDPOINT = `${BACKEND_URL}/create-account`;

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.put(CREATE_ACCOUNT_ENDPOINT, null, {params:{
        "username": username,
        "email": email,
        "password": password,
       }
      })
      console.log(email);
      console.log(password);
      console.log('Account created successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.log(username);
      console.log(email);
      console.log(password);
      console.error('There was an error creating the account:', error);
      setError(error.response?.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <label htmlFor="confirmPassword">Enter Password Again:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccount;
