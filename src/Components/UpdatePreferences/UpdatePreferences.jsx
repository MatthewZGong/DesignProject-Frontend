import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { BACKEND_URL } from '../../constants';

function JobsByPreferences() {
  const userId = localStorage.getItem('user_id');
  const [jobLocation, setJobLocation] = useState('None');
  const [jobType, setJobType] = useState('None');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

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
            console.log(response.data.preference);
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

  return (
    <div>
      <header>
        <h1>View Jobs by Preferences</h1>
      </header>
      
      {/* Button to navigate to the update preferences form */}
      <button onClick={() => window.location.href = '/updatePreferencesForm'}>
        Update Preferences
      </button>
      
      {/* Display the user's job type preference */}
      <p>Type of jobs: {jobType}</p>
      
      {/* Display the user's job location preference */}
      <p>Location of jobs: {jobLocation}</p>
    </div>
  );
}

export default JobsByPreferences;