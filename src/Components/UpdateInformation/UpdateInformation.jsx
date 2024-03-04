import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const UPDATE_Information_ENDPOINT = `${BACKEND_URL}/update-information`;

function UpdateInformation() {
  const [userid, setuserid] = useState('');
  const [name, setname] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');
//   const [sortby, setsortby] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put(UPDATE_Information_ENDPOINT, {
        params: {
        "user_id": userid,
        "name": name,
        "password": password,
        }
       });
      console.log(userid);
      console.log(name);
      console.log(password);
      console.log('Information Updated Successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.log(userid);
      console.log(name);
      console.log(password);
      console.error('There was an error updating user information', error);
      setError(error.response?.data?.message || 'Failed to update user information. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userid">Userid:</label>
          <input 
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setuserid(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">New Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Update Information</button>
      </form>
    </div>
  );
}

export default UpdateInformation;