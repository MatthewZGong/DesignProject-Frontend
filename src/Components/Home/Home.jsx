// This file contains the Home component, which serves as the landing page of the application.
import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from './logo.jpeg';

// Home component renders the welcome message, logo, and navigation buttons.
function Home() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // handleViewProfile function navigates to the user profile page.
  const handleViewProfile = () => {
    navigate('/User');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Welcome to the Job Board</h1>
      <img src={logo} alt="Logo" />
      <br />
      {!isLoggedIn && (
        <button onClick={() => (window.location.href = '/createAccount')}>
          Create Account and Explore Jobs
        </button>
      )}
      {isLoggedIn && (
        <button onClick={handleViewProfile}>View your profile</button>
      )}
      <br />
      <br />
      <br />
    </div>
  );
}

export default Home;