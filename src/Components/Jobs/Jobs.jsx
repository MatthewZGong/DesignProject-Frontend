import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const JOBS_ENDPOINT = `${BACKEND_URL}/read_most_recent_jobs`;

function AddJobForm({
  visible,
  cancel,
  fetchJobs,
  setError,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const changeTitle = (event) => { setTitle(event.target.value); };
  const changeDescription = (event) => { setDescription(event.target.value); };

  const addJob = (event) => {
    event.preventDefault();
    axios.post(JOBS_ENDPOINT, { title, description })
      .then(fetchJobs)
      .catch(() => { setError('There was a problem adding the job posting.'); });
  };

  if (!visible) return null;
  return (
    <form onSubmit={addJob}>
      <label htmlFor="title">
        Job Title
      </label>
      <input required type="text" id="title" value={title} onChange={changeTitle} />
      <label htmlFor="description">
        Job Description
      </label>
      <textarea required id="description" value={description} onChange={changeDescription} />
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}
AddJobForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchJobs: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

function Job({ job }) {
  const { company, date, job_description, job_title, job_type, location } = job;
  return (
            <div className="job-container">
            <div className="title-container">
                <h2>{job_title} at {company}</h2>
            </div>
            <div className="content-container">
                <div className="left-column">
                <p><strong>Type:</strong> {job_type}</p>
                <p><strong>Description:</strong> {job_description}</p>
                </div>
                <div className="right-column">
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Date:</strong> {date}</p>
                </div>
            </div>
            </div>
  );
}
Job.propTypes = {
  job: propTypes.shape({
    company: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    job_description: propTypes.string.isRequired,
    job_title: propTypes.string.isRequired,
    job_type: propTypes.string.isRequired,
    location: propTypes.string.isRequired,
  }).isRequired,
};


// function jobsObjectToArray({ Data }) {
//   return Object.keys(Data).map(key => Data[key]);
// }

function Jobs() {
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [addingJob, setAddingJob] = useState(false);

  const fetchJobs = () => {
    const numbers = 5;

    axios.get(`${JOBS_ENDPOINT}?numbers=${numbers}`)
      .then(({ data }) => {
        console.log(data);
        setJobs(data);
        
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setError('There was a problem retrieving the list of job postings.');
      });
  };

  useEffect(fetchJobs, []);

  const showAddJobForm = () => { setAddingJob(true); };
  const hideAddJobForm = () => { setAddingJob(false); };

  useEffect(fetchJobs, []);

  return (
    <div className="wrapper">
      <header>
        <h1>View All Job Postings</h1>
        <button type="button" onClick={showAddJobForm}>Add a Job Posting</button>
      </header>
      <AddJobForm
        visible={addingJob}
        cancel={hideAddJobForm}
        fetchJobs={fetchJobs}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {jobs.map((job) => <Job key={job.title} job={job} />)}
    </div>
  );
}

export default Jobs;
