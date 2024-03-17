import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
import { useAuth } from '../../AuthContext';

const DETELEACCOUNT_ENDPOINT = `${BACKEND_URL}/delete-account`;


function DeleteUser() {
  const [userid, setuserid] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { deleteaccount } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(DETELEACCOUNT_ENDPOINT, {
        params: {
        "userid": userid
        }
       });
       //using response.data please use localstorage so that it can be accessed from other files
       const info = response.data.message

      console.log('Account deleted successfully:', response.data);
      deleteaccount(info);
      navigate('/Home');
    } catch (error) {
      console.log(userid);
      console.error('There was an error deleting account:', error);
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
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Confirm to delete account</button>
      </form>
      <br></br>
      <button onClick={() => window.location.href = '/User'}>Cancel</button>
    </div>
  );
}

export default DeleteUser;