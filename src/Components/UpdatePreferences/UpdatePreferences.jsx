import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
const Read_Most_Recent_Jobs_Endpoint = `${BACKEND_URL}/READ_MOST_RECENT_JOBS`;
function JobsByPreferences() {
  const [numDays, setNumDays] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  const handleShowJobs = async () => {
    if (!numDays) {
      alert("Please enter the number of days.");
      return;
    }

    try {
      const response = await axios.get(Read_Most_Recent_Jobs_Endpoint, {
        params: { days: numDays },
      });
      setJobs(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again.");
    }
  };

  return (
    <div>
      <header>
        <h1>View Jobs by Preferences</h1>
      </header>
      <div>
        
        <label>
          Show Jobs from the most recent
          <input
            style={{ margin: '0 5px' }} 
            type="number"
            value={numDays}
            onChange={(e) => setNumDays(e.target.value)}
            placeholder="Number"
            min="1"
          />
          Days
        </label>
        <button onClick={handleShowJobs}>Enter</button>
      </div>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {jobs.map((job, index) => (
          <div key={index}>{job.name} - {job.company} - {job.status} - {job.Date} - {job.Link}</div>
        ))}
      </div>
      <button onClick={() => window.location.href = '/updatePreferencesForm'}>Update Preferences</button>
    </div>
  );
}

export default JobsByPreferences;
