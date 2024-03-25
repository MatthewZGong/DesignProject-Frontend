import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';
const Read_Most_Recent_Jobs_Endpoint = `${BACKEND_URL}/READ_MOST_RECENT_JOBS`;
const User_Report_Endpoint = `${BACKEND_URL}/USER_REPORT`;

function JobsByPreferences() {
  const [numDays, setNumDays] = useState('');
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('');
  const [jobId, setJobId] = useState('');
  const [report, setReport] = useState('');

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

  const handleSubmitReport = async () => {
    if (!userId || !jobId || !report) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    try {
      await axios.post(User_Report_Endpoint, {
        user_id: userId,
        job_id: jobId,
        report: report,
      });
      alert("Report submitted successfully!");
    } catch (err) {
      console.error("Error submitting report:", err);
      setError("Failed to submit report. Please try again.");
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
      <div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
        />
        <input
          type="text"
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          placeholder="Job ID"
        />
        <textarea
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder="Report"
        />
        <button onClick={handleSubmitReport}>Submit Report</button>
      </div>
      <button onClick={() => window.location.href = '/updatePreferencesForm'}>Update Preferences</button>
    </div>
  );
}

export default JobsByPreferences;
