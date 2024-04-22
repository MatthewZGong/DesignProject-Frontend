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
      <br />
      <br />
      <br />
      
      <form>
       
  
        <div>
          <label htmlFor="jobtype">Job Types, Keyword, or Company:</label>
          <p>                       </p>
          <p>                       </p>
      
          <select>
            <option value="SWE">SWE</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Front End">Front End</option>
            <option value="Back End">Back End</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Junior SWE">Junior SWE</option>
            <option value="STEM Teacher">STEM Teacher</option>
            <option value="Desktop Support">Desktop Support</option>
            <option value="Cybersecurity">Cybersecurity</option>
            <option value="OS Engineer">OS Engineer</option>
          </select>
        </div>
        <p>                       </p>
      </form>
    
      
    </div>      
  );
}

export default Home;