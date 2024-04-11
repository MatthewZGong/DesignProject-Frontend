import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpeg';

function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/User');
  };

  return (
    <div>
      <h1>Welcome to the Job Board</h1>
      <img src={logo} alt="Logo" />
      <br />
      {!isLoggedIn && (
        <button onClick={() => window.location.href = '/createAccount'}>Create Account and Explore Jobs</button>
      )}
      {isLoggedIn && (
        <button onClick={handleViewProfile}>View your profile</button>
      )}
    </div>
  );
}

export default Home;