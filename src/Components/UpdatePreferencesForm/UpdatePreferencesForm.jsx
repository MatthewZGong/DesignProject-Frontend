import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const UPDATE_PREFERENCES_ENDPOINT = `${BACKEND_URL}/update-preferences`;

function UpdatePreferencesForm() {
  const [userid, setuserid] = useState('');
  const [location, setlocation] = useState('');
  const [jobtype, setjobtype] = useState('');
  const [error, setError] = useState('');
//   const [sortby, setsortby] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.put(UPDATE_PREFERENCES_ENDPOINT, {
        params: {
        "user_id": userid,
        "location": location,
        "job_type": jobtype,
        }
       });
      console.log(userid);
      console.log(location);
      console.log(jobtype);
      console.log('Preferences Updated Successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.log(userid);
      console.log(location);
      console.log(jobtype);
      console.error('There was an error updating user preferences', error);
      setError(error.response?.data?.message || 'Failed to update user preferences. Please try again.');
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
          <label htmlFor="email">location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setlocation(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="jobtype">jobtype:</label>
          <input
            type="jobtype"
            id="jobtype"
            value={jobtype}
            onChange={(e) => setjobtype(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Update Preferences</button>
      </form>
    </div>
  );
}

export default UpdatePreferencesForm;