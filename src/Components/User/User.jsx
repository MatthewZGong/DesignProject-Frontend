import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
function User() {
  const [name] = useState('Name'); //from backend get its name
  const [userType] = useState('user'); //from backend get its usertype(admin or user)
  const [jobType] = useState('Type of jobs');//from backend get its job type
  const [jobLocation] = useState('Location of jobs');//from backend get its job location
  const navigate = useNavigate();
  
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

  const LogOut = () => {
    localStorage.removeItem('user_id');
    navigate('/')
  }

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
      
      <button onClick={LogOut}>Log Out</button>
    </div>

  );
}

export default User;

