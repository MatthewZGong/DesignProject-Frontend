import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const JOBS_ENDPOINT = `${BACKEND_URL}/read_most_recent_jobs`;
const ADD_JOB_ENDPOINT = `${BACKEND_URL}/add-new-job`;
const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
};

function AddJobForm({
  visible,
  cancel,
  fetchJobs,
  setError,
}) {

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));

  const handleChange = (setter) => (event) => setter(event.target.value);

  const addJob = (event) => {
    console.error('adding job');
    console.error({ title, company, jobDescription, jobType, location, date });
    event.preventDefault();
    axios.post(ADD_JOB_ENDPOINT, null, { params:{
      "job_title": title, 
      "company": company, 
      "job_description": jobDescription, 
      "job_type": jobType, 
      "location": location, 
      "date":  date.toString()
    }
    })
    .then(fetchJobs)
    .catch(() => { setError('There was a problem adding the job posting.')});

  };

  if (!visible) return null;
  return (
    <form onSubmit={addJob} className="add-job-form">
      <label htmlFor="company">Company</label>
      <input required type="text" id="company" value={company} onChange={handleChange(setCompany)} />
      <label htmlFor="job_title">Job Title</label>
      <input required type="text" id="job_title" value={title} onChange={handleChange(setTitle)} />
      <label htmlFor="job_type">Job Type</label>
      <input required type="text" id="job_type" value={jobType} onChange={handleChange(setJobType)} />
      <label htmlFor="location">Location</label>
      <input required type="text" id="location" value={location} onChange={handleChange(setLocation)} />
      <label htmlFor="date">Date</label>
      <input required type="date" id="date" value={date} onChange={handleChange(setDate)} />
      <label htmlFor="job_description">Job Description</label>
      <input required id="job_description" value={jobDescription} onChange={handleChange(setJobDescription)} />
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
//   const [numberJobs, setNumberJobs] = useState('');

  let number_jobs =5;
  const fetchJobs = () => {

    axios.get(`${JOBS_ENDPOINT}?numbers=${number_jobs}`)
      .then(({ data }) => {
        console.log(data);
        setJobs(data);
        
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setError('There was a problem retrieving the list of job postings.' + JOBS_ENDPOINT + process.env.REACT_APP_BACKEND_URL);
      });
  };
  const handleJobCountChange = (e) => {
    // Ensure only positive integers are accepted
    var value = e.target.value.replace(/\D/, ''); // remove non-digit characters
    if (isNaN(value)) {
        value = 1; 
    }
    number_jobs = Math.max(value,1);
    fetchJobs();
  };


  useEffect(fetchJobs, []);

  const showAddJobForm = () => { setAddingJob(true); };
  const hideAddJobForm = () => { setAddingJob(false); };

  useEffect(fetchJobs, []);
  
  const reversedJobs = [...jobs].reverse();

  return (
    <div className="wrapper">
      <header>
        <h1>View All Job Postings</h1>
        <button type="button" onClick={showAddJobForm}>Add a Job Posting</button>

      </header>
      <label htmlFor="recentJobsInput">Recent </label>
        <input
            type="number"
            id="recentJobsInput"
            onChange={handleJobCountChange}
            min="1"
         />
        <label htmlFor="recentJobsInput"> Jobs</label>
      <AddJobForm
        visible={addingJob}
        cancel={hideAddJobForm}
        fetchJobs={fetchJobs}
        setError={setError}
      />
      {error && <ErrorMessage message={error} />}
      {reversedJobs.map((job) => <Job key={job.title} job={job} />)}
      
    </div>
  );
}

export default Jobs;
