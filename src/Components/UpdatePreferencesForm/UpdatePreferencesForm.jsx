import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';
import { useAuth } from '../../AuthContext';

const UPDATE_PREFERENCES_ENDPOINT = `${BACKEND_URL}/update-preferences`;

function UpdatePreferencesForm() {
  // const [userid, setuserid] = useState('');
  const [location, setlocation] = useState('');
  const [jobtype, setjobtype] = useState('');
  const [error, setError] = useState('');
  const { updatepreference } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put(UPDATE_PREFERENCES_ENDPOINT, {
        params: {
        "user_id": localStorage.getItem('user_id'),
        "location": location,
        "job_type": jobtype,
        }
       });
       const info = response.data.message

      updatepreference(info);
      // console.log(user_id);
      console.log(location);
      console.log(jobtype);
      console.log('Preferences Updated Successfully:', response.data);
      navigate('/');
    } catch (error) {
      // console.log(user_id);
      console.log(location);
      console.log(jobtype);
      console.error('There was an error updating user preferences', error);
      setError(error.response?.data?.message || 'Failed to update user preferences. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="userid">Userid:</label>
          <input 
            type="text"
            id="userid"
            value={userid}
            onChange={(e) => setuserid(e.target.value)}
          />
        </div> */}
        <div>
          <label htmlFor="location">location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jobtype">jobtype:</label>
          <p>                       </p>
          <p>                       </p>
      
          {/* <input
            type="jobtype"
            id="jobtype"
            value={jobtype}
            onChange={(e) => setjobtype(e.target.value)}
          /> */}
          <select>
            <option value="SWE">SWE</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Front End">Front End</option>
            <option value="Back End">Front End</option>
            <option value="Artificial Intelligence">Front End</option>
            <option value="Project Management">Front End</option>
            onChange={(e) => setjobtype(e.target.value)}
          </select>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <p>                       </p>
        <button type="submit">Update Preferences</button>
      </form>
    </div>
  );
}

export default UpdatePreferencesForm;
