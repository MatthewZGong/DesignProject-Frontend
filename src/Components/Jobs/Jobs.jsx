import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { BACKEND_URL } from '../../constants';

const JOBS_ENDPOINT = `${BACKEND_URL}/read_most_recent_jobs`;
const ADD_JOB_ENDPOINT = `${BACKEND_URL}/add_new_job`;
const REPORT_ENDPOINT = `${BACKEND_URL}/add_user_report`;
const DELETE_ENDPOINT = `${BACKEND_URL}/admin_delete_jobs`;
const UPDATE_JOB_ENDPOINT = `${BACKEND_URL}/update_job_posting`;
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

  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(formatDate(new Date()));
  const [jobLink, setJobLink] = useState('');


  const handleChange = (setter) => (event) => setter(event.target.value);

  const addJob = (event) => {
    console.error('adding job');
    console.error({company, jobDescription, jobType, location, date,jobLink });
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

  if (!visible) return null;
  return (
    <form onSubmit={addJob} className="add-job-form">
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



function Job({ job, setError}) {
  const handleChange = (setter) => (event) => setter(event.target.value);
  const {company, date, job_description, job_type, location, link, job_id}  = job; 
  const [reportReason, setReportReason] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const click_report = () => { setSubmittingReport(!submittingReport); };
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const { isLoggedIn, isAdmin } = useAuth();

  
  const [shouldDelete, setShouldDelete] = useState(false);
  const [editing, setEditing] = useState(false);
  const [company_value, setCompany] = useState(company);
  const [date_value, setDate] = useState(date);
  const [job_description_value, setJobDescription] = useState(job_description);
  const [job_type_value, setJobType] = useState(job_type);
  const [location_value, setLocation] = useState(location);
  const [link_value, setLink] = useState(link);





  const submitReport =  () => { 
    axios.post(REPORT_ENDPOINT, null, { params:{
        "job_id": job_id,
        "report": reportReason,
        "user_id": localStorage.getItem('user_id')
    }
    }).catch(() => { setError('There was a problem submitting the report.')});
  }

  const deleteJob = () => {
    axios.delete(DELETE_ENDPOINT, { params:{
        "admin_id": localStorage.getItem('user_id'),
        "job_id": job_id
    }
    }).catch(() => { setError('There was a problem deleting the job posting.')});
    //delete the current div
    // updateJobs();
    setShouldDelete(true);
  }
  const handleEdit = () => {
    axios.put(UPDATE_JOB_ENDPOINT, null, { params:{
        "job_id": job_id,
        "company": company_value,
        "date": date_value,
        "job_description": job_description_value,
        "job_type": job_type_value,
        "location": location_value,
        "link": link_value
    }
    }).catch(() => { setError('There was a problem updating the job posting.')});
    setEditing(false);
  }

  if(shouldDelete){
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
            {job_description_value != "" && (<p><strong>Description:</strong> {job_description_value}</p>)}
            </div>
            {editing && (<form onSubmit={handleEdit}  className="add-job-form">    
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
            </form>)}
                {isLoggedIn && isAdmin && ( <button onClick={() => setEditing(!editing)}> {editing ? "Cancel" : "Edit"}</button> )}
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
                <button onClick={click_report}>Report</button> )}
                { submittingReport  && isLoggedIn && 
                (<form className="report-form" id={job_id} onSubmit={submitReport}>
                    <textarea id="Reason" name="Reason" rows="5" value={reportReason} onChange={handleChange(setReportReason)}></textarea>
                    <button type="submit">Submit</button>
                </form>
                )}
            
            </div>
  );
}
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


// function jobsObjectToArray({ Data }) {
//   return Object.keys(Data).map(key => Data[key]);
// }

function Jobs() {
  const [error, setError] = useState('');
  const [jobs, setJobs] = useState([]);
  const [addingJob, setAddingJob] = useState(false);
  const { isLoggedIn, isAdmin } = useAuth();
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

//   const fetchJobByPrefernces = (query) => {
      
//   }
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

//   useEffect(fetchJobs, []);
  
  const reversedJobs = [...jobs].reverse();

  return (
    <div className="wrapper">
      <header>
        <h1>View All Job Postings</h1>
        {isLoggedIn && isAdmin && (
        <button type="button" onClick={showAddJobForm}>Add a Job Posting</button>
      )}

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
      {reversedJobs.map((job) => <Job key={job.title} job={job} setError={setError} updateJobs={fetchJobs} />)}
      
    </div>
  );
}

export default Jobs;
