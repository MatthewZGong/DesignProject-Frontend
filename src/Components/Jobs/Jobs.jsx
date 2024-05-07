import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { BACKEND_URL } from '../../constants';

const JOBS_ENDPOINT = `${BACKEND_URL}/read_most_recent_jobs`;
const SEARCH_JOBS_ENDPOINT = `${BACKEND_URL}/search_jobs_by_vector`;
const ADD_JOB_ENDPOINT = `${BACKEND_URL}/add_new_job`;
const REPORT_ENDPOINT = `${BACKEND_URL}/add_user_report`;
const DELETE_ENDPOINT = `${BACKEND_URL}/admin_delete_jobs`;
const UPDATE_JOB_ENDPOINT = `${BACKEND_URL}/update_job_posting`;

// Function to format the date in "YYYY-MM-DD" format
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

// Component for adding a new job posting
function AddJobForm({
  visible,
  cancel,
  fetchJobs,
  setError,
}) {
  // State variables for form fields
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [jobLink, setJobLink] = useState('');

  // Function to handle input changes
  const handleChange = (setter) => (event) => setter(event.target.value);

  // Function to handle form submission
  const addJob = (event) => {
    event.preventDefault();
    axios.post(ADD_JOB_ENDPOINT, null, { params:{
      "company": company, 
      "job_description": jobDescription, 
      "job_type": jobType, 
      "location": location, 
      "date":  date.toString(),
      "link": jobLink,
    }
    })
    .then(fetchJobs)
    .catch(() => { setError('There was a problem adding the job posting.')});
  };

  // Render the form only if it's visible
  if (!visible) return null;
  return (
    <form onSubmit={addJob} className="add-job-form">
      {/* Render form fields */}
      <label htmlFor="company">Company</label>
      <input required type="text" id="company" value={company} onChange={handleChange(setCompany)} />
      <label htmlFor="job_type">Job Type</label>
      <input required type="text" id="job_type" value={jobType} onChange={handleChange(setJobType)} />
      <label htmlFor="location">Location</label>
      <input required type="text" id="location" value={location} onChange={handleChange(setLocation)} />
      <label htmlFor="date">Date</label>
      <input required type="date" id="date" value={date} onChange={handleChange(setDate)} />
      <label htmlFor="job_description">Job Description</label>
      <input id="job_description" value={jobDescription} onChange={handleChange(setJobDescription)} />
      <label htmlFor="job_link">Job Link</label>
      <input required type="text" id="job_link" value={jobLink} onChange={handleChange(setJobLink)} />
      <button type="button" onClick={cancel}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  );
}

// Prop types for AddJobForm component
AddJobForm.propTypes = {
  visible: propTypes.bool.isRequired,
  cancel: propTypes.func.isRequired,
  fetchJobs: propTypes.func.isRequired,
  setError: propTypes.func.isRequired,
};

// Component for displaying error messages
function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}

// Prop types for ErrorMessage component
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

// Component for displaying a single job posting
function Job({ job, setError}) {
  const handleChange = (setter) => (event) => setter(event.target.value);
  const { company, date, job_description, job_type, location, link, job_id } = job;
  const [reportReason, setReportReason] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const click_report = () => { setSubmittingReport(!submittingReport); };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isLoggedIn, isAdmin } = useAuth();

  const [shouldDelete, setShouldDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [company_value, setCompany] = useState('');
  const [date_value, setDate] = useState('');
  const [job_description_value, setJobDescription] = useState('');
  const [job_type_value, setJobType] = useState('');
  const [location_value, setLocation] = useState('');
  const [link_value, setLink] = useState('');

  // Update form fields when job details change
  useEffect(() => {
    setCompany(company);
    setDate(date);
    setJobDescription(job_description);
    setJobType(job_type);
    setLocation(location);
    setLink(link);
  }, [company, date, job_description, job_type, location, link]);

  // Function to submit a report for the job posting
  const submitReport = () => {
    axios.post(REPORT_ENDPOINT, null, {
      params: {
        "job_id": job_id,
        "report": reportReason,
        "user_id": localStorage.getItem('user_id')
      }
    }).catch(() => { setError('There was a problem submitting the report.') });
  }

  // Function to delete the job posting
  const deleteJob = () => {
    axios.delete(DELETE_ENDPOINT, {
      params: {
        "admin_id": localStorage.getItem('user_id'),
        "job_id": job_id
      }
    }).catch(() => { setError('There was a problem deleting the job posting.') });
    setShouldDelete(true);
  }

  // Function to handle editing the job posting
  const handleEdit = () => {
    axios.put(UPDATE_JOB_ENDPOINT, null, {
      params: {
        "job_id": job_id,
        "company": company_value,
        "date": date_value,
        "job_description": job_description_value,
        "job_type": job_type_value,
        "location": location_value,
        "link": link_value
      }
    }).catch(() => { setError('There was a problem updating the job posting.') });
    setEditing(false);
  }

  // If the job posting is marked for deletion, don't render it
  if (shouldDelete) {
    return null;
  }

  return (
    <div className="job-container">
      {!editing && (
        <div className="title-container">
          <h2><a href={link_value}>{job_type_value}</a></h2>
          <h2><a>{company_value}</a></h2>
        </div>
      )}
      <div>
        {!editing && (
          <div className="content-container">
            <div className="left-column">
              <p><strong>Location:</strong> {location_value}</p>
            </div>
            <div className="right-column">
              <p><strong>Date:</strong> {date_value}</p>
            </div>
          </div>
        )}
        {job_description_value !== "" && (<p><strong>Description:</strong> {job_description_value}</p>)}
      </div>
      {editing && (
        <form onSubmit={handleEdit} className="add-job-form">
          {/* Render form fields for editing */}
          <label htmlFor="company">Company</label>
          <input required type="text" id="company" value={company_value} onChange={handleChange(setCompany)} />
          <label htmlFor="job_type">Job Type</label>
          <input required type="text" id="job_type" value={job_type_value} onChange={handleChange(setJobType)} />
          <label htmlFor="location">Location</label>
          <input required type="text" id="location" value={location_value} onChange={handleChange(setLocation)} />
          <label htmlFor="date">Date</label>
          <input required type="date" id="date" value={date_value} onChange={handleChange(setDate)} />
          <label htmlFor="job_description">Job Description</label>
          <input id="job_description" value={job_description_value} onChange={handleChange(setJobDescription)} />
          <label htmlFor="job_link">Job Link</label>
          <input required type="text" id="job_link" value={link_value} onChange={handleChange(setLink)} />
          <button type="submit">Submit</button>
        </form>
      )}
      {isLoggedIn && isAdmin && (
        <button onClick={() => setEditing(!editing)}>{editing ? "Cancel" : "Edit"}</button>
      )}
      {isLoggedIn && isAdmin && (
        <button onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
      )}
      {showDeleteConfirmation && isAdmin && isLoggedIn && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this job posting?</p>
          <button onClick={deleteJob}>Yes, Delete</button>
          <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
        </div>
      )}
      {isLoggedIn && (
        <button onClick={click_report}>Report</button>
      )}
      {submittingReport && isLoggedIn && (
        <form className="report-form" id={job_id} onSubmit={submitReport}>
          <textarea id="Reason" name="Reason" rows="5" value={reportReason} onChange={handleChange(setReportReason)}></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

// Prop types for Job component
Job.propTypes = {
  job: propTypes.shape({
    company: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
    job_description: propTypes.string.isRequired,
    job_type: propTypes.string.isRequired,
    location: propTypes.string.isRequired,
    link: propTypes.string,
    job_id: propTypes.string.isRequired
  }).isRequired,
};

// Main Jobs component
function Jobs() {
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [addingJob, setAddingJob] = useState(false);
  const { isLoggedIn, isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryDisplay, setSearchQueryDisplay] = useState("Most Recent Jobs");

  // Function to fetch user preferences
  const getUserPreference = () => {
    axios.get(`${BACKEND_URL}/get_preferences`, {
      params: {
        "user_id": localStorage.getItem('user_id')
      }
    })
    .then(({ data }) => {
      let jobType = data.preference.job_type;
      let location = data.preference.location;
      if (jobType === 'any') {
        jobType = "";
      }
      if (location === 'any') {
        location = "";
      }
      if (jobType != "" || location != "") {
        setSearchQuery(jobType + " " + location);
      }
    })
    .catch((error) => {
      console.error('Error fetching user preferences:', error);
    });
  };

  let number_jobs = 5;

  // Function to fetch job postings
  const fetchJobs = () => {
    console.log(number_jobs);
    if (searchQuery === '') {
      setSearchQueryDisplay("Most Recent Jobs");
      axios.get(`${JOBS_ENDPOINT}?numbers=${number_jobs}`)
        .then(({ data }) => {
          console.log(data);
          setJobs(data);
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
          setError('There was a problem retrieving the list of job postings.' + JOBS_ENDPOINT + process.env.REACT_APP_BACKEND_URL);
        });
    } else {
      setSearchQueryDisplay(`Search Results for "${searchQuery}"`);
      console.log(searchQuery);
      axios.get(`${SEARCH_JOBS_ENDPOINT}`, { params: { "query": searchQuery, "limit": number_jobs } })
        .then(({ data }) => {
          console.log(data);
          setJobs(data);
        })
        .catch((error) => {
          console.error('Error fetching jobs:', error);
          setError('There was a problem retrieving the list of job postings.' + SEARCH_JOBS_ENDPOINT + process.env.REACT_APP_BACKEND_URL);
        });
    }
  };

  // Function to handle changes in the job count input
  const handleJobCountChange = (e) => {
    var value = e.target.value.replace(/\D/, '');
    if (isNaN(value)) {
      value = 1;
    }
    number_jobs = Math.max(value, 1);
  };

  useEffect(fetchJobs, []);

  const showAddJobForm = () => { setAddingJob(true); };
  const hideAddJobForm = () => { setAddingJob(false); };

  useEffect(() => {
    getUserPreference();
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>View All Job Postings</h1>
        {isLoggedIn && isAdmin && (
          <button type="button" onClick={showAddJobForm}>Add a Job Posting</button>
        )}
      </header>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchJobs()}
        />
      </div>
      <div className="search-bar-container">
        <label htmlFor="recentJobsInput" style={{ marginRight: '10px' }}>Number of jobs: </label>
        <input
          type="number"
          id="recentJobsInput"
          placeholder={number_jobs}
          onChange={(e) => handleJobCountChange(e)}
          min="1"
        />
      </div>
      
      <h1 style={{textAlign: "center"}}>{searchQueryDisplay}</h1>

      <AddJobForm
        visible={addingJob}
        cancel={hideAddJobForm}
        fetchJobs={fetchJobs}
        setError={setError}
      />


      {error && <ErrorMessage message={error} />}
      {jobs.map((job) => <Job key={job.id} job={job} setError={setError} />)}
    </div>
  );
}

export default Jobs;