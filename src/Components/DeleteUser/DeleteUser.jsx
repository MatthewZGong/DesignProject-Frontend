import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useAuth } from '../../AuthContext';

const DETELEACCOUNT_ENDPOINT = `${BACKEND_URL}/delete-account`;

function DeleteUser() {
  // State variables
  const [userid, setuserid] = useState('');
  const [error, setError] = useState('');

  // Get the deleteaccount function from the authentication context
  const { deleteaccount } = useAuth();

  // useNavigate hook for navigation
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a GET request to the delete account endpoint with userid as a parameter
      const response = await axios.get(DETELEACCOUNT_ENDPOINT, {
        params: { "userid": userid }
      });

      // Extract the message from the response data
      const info = response.data.message;
      console.log('Account deleted successfully:', response.data);

      // Call the deleteaccount function from the authentication context
      deleteaccount(info);

      // Navigate to the home page
      navigate('/Home');
    } catch (error) {
      console.log(userid);
      console.error('There was an error deleting account:', error);

      // Set the error message based on the error response or a default message
      setError(error.response?.data?.message || 'Failed to delete account. Please try again.');
    }
  };

  return (
    <div>
      <h2>Delete Account Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userid">userid:</label>
          <input
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setuserid(e.target.value)}
          />
        </div>
        {/* Display error message if there is an error */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Confirm to delete account</button>
      </form>
      <br></br>
      {/* Cancel button to navigate back to the user page */}
      <button onClick={() => window.location.href = '/User'}>Cancel</button>
    </div>
  );
}

export default DeleteUser;