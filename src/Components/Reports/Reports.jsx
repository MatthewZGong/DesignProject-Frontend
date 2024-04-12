import React, { useState} from 'react';
import propTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';
import { BACKEND_URL } from '../../constants';

// const ERROR_MESSAGE_ENDPOINT = `${BACKEND_URL}/get_user_reports`;

const REPORTS_ENDPOINT = `${BACKEND_URL}/get_user_reports`;
const REPORTS_DELETE_ENDPOINT = `${BACKEND_URL}/delete_user_report`;

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
    const {id, user_id, job_id, data} = rep;
    const [showResolved, setShowResolved] = useState(false);
    if(showResolved){
        return null;
    }
    const handleResolve = () => {
        // setShowResolved(true);
        console.log(id);
        axios.delete(`${REPORTS_DELETE_ENDPOINT}`, { params: {"report_id": id}})
        .then(() => {
            setShowResolved(true);
        })
    }

    return (
        <div className="report-container">
            <div className="report-header" key={id}>
                <h2>Report #{ind+1}</h2>
                <p>User ID: {user_id}</p>
                <p>Job ID: {job_id}</p>
            </div>
            <div className="report-body">
                <p>Reason: {data.report}</p>
            </div>
            <button onClick={handleResolve}>Resolved</button>
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
            setError("this is a test")
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