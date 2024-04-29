import React, { useState} from 'react';
import propTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

// const ERROR_MESSAGE_ENDPOINT = `${BACKEND_URL}/get_user_reports`;

const REPORTS_ENDPOINT = `${BACKEND_URL}/get_user_reports`;
const REPORTS_DELETE_ENDPOINT = `${BACKEND_URL}/delete_user_report`;
const REPORTS_GET_USER_BY_ID_ENDPOINT = `${BACKEND_URL}/get_username_by_id`;
const REPORTS_GET_JOB_BY_ID_ENDPOINT = `${BACKEND_URL}/get_job_by_id`;
const DELETE_ENDPOINT = `${BACKEND_URL}/admin_delete_jobs`;
const UPDATE_JOB_ENDPOINT = `${BACKEND_URL}/update_job_posting`;

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
  

function ReportDiv({rep, ind}) {
    if(!rep){
        return null;
    }
    const handleChange = (setter) => (event) => setter(event.target.value);
    const {id, user_id, job_id, data} = rep;
    const [showResolved, setShowResolved] = useState(false);
    const [username, setUsername] = useState('');

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [invalidJob, setInvalidJob] = useState(false);
    const [editing, setEditing] = useState(false);
    const [company_value, setCompany] = useState('');
    const [date_value, setDate] = useState('');
    const [job_description_value, setJobDescription] = useState('');
    const [job_type_value, setJobType] = useState('');
    const [location_value, setLocation] = useState('');
    const [link_value, setLink] = useState('');

    
    const get_username = () => {
        axios.get(REPORTS_GET_USER_BY_ID_ENDPOINT, { params: {"user_id": user_id}})
        .then(({ data }) => {
            setUsername(data.username);
        })
    }
    const get_job = () => {
        axios.get(REPORTS_GET_JOB_BY_ID_ENDPOINT, { params: {"job_id": job_id}})
        .then(({ data }) => {
            setCompany(data.company);
            setDate(data.date);
            setJobDescription(data.job_description);
            setJobType(data.job_type);
            setLocation(data.location);
            setLink(data.link);
        })
    }
    React.useEffect(() => {
        get_username();
        get_job();
    }, []);
    const handleResolve = () => {
        // setShowResolved(true);
        console.log(id);
        axios.delete(`${REPORTS_DELETE_ENDPOINT}`, { params: {"report_id": id}})
        .then(() => {
            setShowResolved(true);
        })
    }
    const deleteJob = () => {
        axios.delete(DELETE_ENDPOINT, { params:{
            "admin_id": localStorage.getItem('user_id'),
            "job_id": job_id
        }
        });
        setInvalidJob(true);
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
        });
        setEditing(false);
      }
    if(showResolved){
        return null;
    }
    return (
        <div className="report-container">
            <div className="report-header" key={id}>
                <h2>Report #{ind+1}</h2>
                <h3>User: {username}</h3>
            </div>
            <div className="report-body">
                <h3>Reason: {data.report}</h3>
            </div>
            {!invalidJob && (
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
                <button onClick={() => setEditing(!editing)}> {editing ? "Cancel" : "Edit"}</button> 
     
                <button onClick={() => setShowDeleteConfirmation(true)}>Delete</button>
                
                {showDeleteConfirmation && (
                    <div className="confirmation-dialog">
                    <p>Are you sure you want to delete this job posting?</p>
                    <button onClick={deleteJob}>Yes, Delete</button>
                    <button onClick={() => setShowDeleteConfirmation(false)}>Cancel</button>
                    </div>
                )}
            </div>
            )}
        
        <button onClick={handleResolve}>Resolve</button>
        </div>
        
    );
} 
ReportDiv.propTypes = {
rep: propTypes.shape({
    id: propTypes.string,
    user_id: propTypes.string,
    job_id: propTypes.string,
    data: propTypes.object,
})
};


function Reports() {
    const { isLoggedIn, isAdmin } = useAuth();
    const [error, setError] = useState('');
    const [reports, setReports] = useState([]);

    

    const navigate = useNavigate();
    React.useEffect(() => {
        if (!isLoggedIn || !isAdmin) {
        navigate('/');
        }
    }, []);
    if(!isLoggedIn || !isAdmin){
        return null;
    }

    const fetchReports = () => {
        axios.get(`${REPORTS_ENDPOINT}`)
        .then(({ data }) => {
            setReports(data);


        })
        .catch(() => {
            setError('There was a problem retrieving the list of reports.');
        });
    };
    React.useEffect(fetchReports, []);
    // const test = [...reports].reverse();
    return (
    <div className="wrapper">
        <header>
        <h1>User Reports</h1>
        </header>
        {error && <ErrorMessage message={error} />}
        {reports.map((report,ind) => <ReportDiv key={ind} rep={report} ind={ind} />)}
        {/* { <ReportDiv key={1} rep={reports} />} */}
    </div>
    );
}

export default Reports;