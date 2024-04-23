import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';


function User() {
  const name = localStorage.getItem('username')
  const { isLoggedIn, logout, isAdmin } = useAuth();
  let userType = 'user'
  if (isAdmin){
     userType = 'admin';}
  const [jobType, setJobType] = useState('Type of jobs');
  const [jobLocation, setJobLocation] = useState('Location of jobs');
  const navigate = useNavigate();
  const userId = localStorage.getItem('user_id');
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
        console.log(response.data)
        setJobType(response.data.jobType);
        setJobLocation(response.data.jobLocation);
      } catch (error) {
        console.error('Failed to fetch preferences:', error);
      }
    };
    if (userId) {
      fetchPreferences();
    }

  }, [userId]);
    
  const UpdateUserInformation = () => {
    //redirect to another endpoint
    navigate('/UpdateInformation')
  };

  const UpdateUserPreference = () => {
    navigate('/UpdatePreferencesForm')
  };
  const ViewJobsbyPreference = () => {
    navigate('/UpdatePreferences')
  };
  const DeleteUser = () => {
    console.log("test");
    axios.delete(`${BACKEND_URL}/delete-account`, {
        params: {
        "user_id": localStorage.getItem('user_id')
        }
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
      <button onClick={ViewJobsbyPreference}>View Jobs by Preference</button>
        <button onClick={() => setShowConfirmation(true)}>Delete Account</button>
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

