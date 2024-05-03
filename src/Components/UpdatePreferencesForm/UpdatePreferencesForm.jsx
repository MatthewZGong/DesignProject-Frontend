import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const UPDATE_PREFERENCES_ENDPOINT = `${BACKEND_URL}/update_preferences`;

function UpdatePreferencesForm() {
  const [user_id, setuserid] = useState('');
  const [location, setlocation] = useState('');
  const [jobtype, setjobtype] = useState('');
  const [error, setError] = useState('');
  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setuserid(user_id);
    console.log(jobtype);
    const queryParams = new URLSearchParams({
      user_id: localStorage.getItem('user_id'), 
      location: location,   
      job_type: jobtype,      
    }).toString();
  
    
    const urlWithParams = `${UPDATE_PREFERENCES_ENDPOINT}?${queryParams}`;
  
    try {
      
      const response = await axios.put(urlWithParams, null);
      console.log(user_id, location, jobtype);
      console.log('Preferences Updated Successfully:', response.data);
      navigate('/User');
    } catch (error) {
      console.error('There was an error updating user preferences:', error);
      setError(error.response?.data?.message || 'Failed to update user preferences. Please try again.');
    }
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div>
          <label htmlFor="location">Location:</label>
          <p>                       </p>
          <p>                       </p>
          <select id="location" value={location} onChange={(e) => setlocation(e.target.value)}
          style={{ width: '250px', height: '40px', padding: '10px' }}>
            <option value="">-- Select Location --</option>
            <option value="New York, NY">New York, NY</option>
            <option value="Jersey City, NJ">Jersey City, NJ</option>
            <option value="Brooklyn, NY">Brooklyn, NY</option>
            <option value="Berkeley Heights, NJ">Berkeley Heights, NJ</option>
            <option value="Austin, TX">Austin, TX</option>
            <option value="San Jose, CA">San Jose, CA</option>
            <option value="Santa Clara, CA">Santa Clara, CA</option>
            <option value="Seattle, WA">Seattle, WA</option>
            <option value="Remote">Remote</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
        <label htmlFor="jobtype">Job Type:</label>
        <p>                       </p>
        <p>                       </p>
        <select id="jobtype" value={jobtype} onChange={(e) => setjobtype(e.target.value)} 
        style={{ width: '250px', height: '40px', padding: '10px'}}>
        <option value="">-- Select Job Type --</option>
          <option value="SWE">SWE</option>
          <option value="Machine Learning">Machine Learning</option>
          <option value="Front End">Front End</option>
          <option value="Back End">Back End</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
          <option value="Junior SWE">Junior SWE</option>
          <option value="STEM Teacher">STEM Teacher</option>
          <option value="Desktop Support">Desktop Support</option>
          <option value="Cybersecurity">Cybersecurity</option>
          <option value="OS Engineer">OS Engineer</option>
        </select>
      </div>

        {error && <div style={{ color: 'red' }}>{error}</div>}
        <p>                       </p>
        <button type="submit" style={{ margin: '10px' }}>Update Preferences</button>
      </form>
    </div>
  );
}

export default UpdatePreferencesForm;
