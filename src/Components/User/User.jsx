import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';



function User() {
  const [name] = useState('Name'); //from backend get its name
  const [userType] = useState('user'); //from backend get its usertype(admin or user)
  const [jobType] = useState('Type of jobs');//from backend get its job type
  const [jobLocation] = useState('Location of jobs');//from backend get its job location
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);
  
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

