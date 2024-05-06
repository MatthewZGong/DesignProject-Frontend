import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

function User() {
  const name = localStorage.getItem('username');
  const { isLoggedIn, logout, isAdmin } = useAuth();
  let userType = 'user';
  if (isAdmin) {
    userType = 'admin';
  }
  const [jobType, setJobType] = useState('None');
  const [jobLocation, setJobLocation] = useState('None');
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');

  // Check if the user is logged in, if not, redirect to the login page
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        // Make a GET request to the backend API to fetch user preferences
        const response = await axios.get(`${BACKEND_URL}/get_preferences`, {
          params: { "user_id": localStorage.getItem('user_id') }
        });

        // Check if the response data contains user preferences
        if (response.data && response.data.preference) {
          const { location, job_type } = response.data.preference;
          
          // Update the job location and job type state if they are not set to 'any'
          if (location !== 'any' || job_type !== 'any') {
            setJobType(job_type);
            setJobLocation(location);
          }
        }
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    };

    // Fetch preferences only if the user ID is available
    if (userId) {
      fetchPreferences();
    }
  }, [userId]);

  // Function to navigate to the update user information page
  const UpdateUserInformation = () => {
    navigate('/UpdateInformation');
  };

  // Function to navigate to the update user preference page
  const UpdateUserPreference = () => {
    navigate('/UpdatePreferencesForm');
  };

  // Function to delete the user account
  const DeleteUser = () => {
    console.log("test");
    axios.delete(`${BACKEND_URL}/delete_account`, {
      params: { "user_id": localStorage.getItem('user_id') }
    })
      .then(response => {
        console.log('Account deleted successfully:', response.data);
        logout();
        navigate('/Home');
      })
      .catch(error => {
        console.log(localStorage.getItem('user_id'));
        console.error('There was an error deleting account:', error);
        navigate('/Home');
      });
  };

  // State to control the visibility of the confirmation dialog
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>User type: {userType}</p>
      <p>User preferences:</p>
      <ul>
        <li>Type of jobs: {jobType}</li>
        <li>Location of jobs: {jobLocation}</li>
      </ul>
      <button onClick={UpdateUserInformation}>Update User Information</button>
      <button onClick={UpdateUserPreference}>Update User Preference</button>
      <button onClick={() => setShowConfirmation(true)}>Delete Account</button>
      {/* Render the confirmation dialog if showConfirmation is true */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete your account?</p>
          <button onClick={DeleteUser}>Yes, Delete</button>
          <button onClick={() => setShowConfirmation(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default User;