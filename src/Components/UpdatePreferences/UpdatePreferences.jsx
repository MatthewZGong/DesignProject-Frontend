import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { BACKEND_URL } from '../../constants';

// const Get_Job_Preference_Endpoint = `${BACKEND_URL}/get_job_based_on_preference`;

function JobsByPreferences() {
  const userId = localStorage.getItem('user_id');
  const [jobLocation, setJobLocation] = useState('None');
  const [jobType, setJobType] = useState('None');
  const { isLoggedIn} = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);
  
  // Fetch user preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/get_preferences`, {
          params: {
          "user_id": localStorage.getItem('user_id')
          }
        });
        
        if (response.data && response.data.preference) {
          const { location, job_type } = response.data.preference;
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
    if (userId) {
      fetchPreferences();
    }

  }, [userId]);
  
  return (
    <div>
      <header>
        <h1>View Jobs by Preferences</h1>
      </header>
      <button onClick={() => window.location.href = '/updatePreferencesForm'}>Update Preferences</button>
      <p>Type of jobs:{jobType}</p>
      <p>Location of jobs: {jobLocation}</p>
    
      
    </div>
  );
}

export default JobsByPreferences;
