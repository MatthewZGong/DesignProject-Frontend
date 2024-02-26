import React, { useState } from 'react';

function User() {
  const [name] = useState('Name'); //from backend get its name
  const [userType] = useState('admin'); //from backend get its usertype(admin or user)
  const [jobType] = useState('Type of jobs');//from backend get its job type
  const [jobLocation] = useState('Location of jobs');//from backend get its job location

  
  const UpdateUserInformation = () => {
    //redirect to another endpoint
  };

  const UpdateUserPreference = () => {
    //redirect to another endpoint
  };

  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>User type: {userType}</p>
      <p>User preferences:</p>
      <ul>
        <li>Type of jobs: {jobType}</li>
        <li>Location of jobs: {jobLocation}</li>
      </ul>
      <button onClick={UpdateUserInformation}>Update User Information</button>
      <button onClick={UpdateUserPreference}>Update User Information</button>
    </div>
  );
}

export default User;

