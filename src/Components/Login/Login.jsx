import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useAuth } from '../../AuthContext';

const LOGIN_ENDPOINT = `${BACKEND_URL}/login`;

function Login() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/user');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchFormDescription = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/form`);
        const initialFormData = response.data.form_description;
        setFormData(
          Object.keys(initialFormData).reduce((acc, key) => {
            acc[key] = '';
            return acc;
          }, {})
        );
      } catch (error) {
        console.error('There was an error fetching the form description:', error);
        setError('Failed to fetch form description. Please try again.');
      }
    };

    fetchFormDescription();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGIN_ENDPOINT, {
        params: formData,
      });

      const info = response.data.message;
      const isAdmin = formData.username === 'sj';
      login(info, isAdmin);
      console.log('Account created successfully:', response.data);
      navigate('/User');
    } catch (error) {
      console.log(formData.username);
      console.log(formData.password);
      console.error('There was an error logging in:', error);
      setError(error.response?.data?.message || 'Failed to login to account. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input
              type={key === 'password' ? 'password' : 'text'}
              id={key}
              value={value || ''}
              onChange={handleInputChange}
            />
          </div>
        ))}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={() => window.location.href = '/createAccount'}>Create Account</button>
    </div>
  );
}

export default Login;