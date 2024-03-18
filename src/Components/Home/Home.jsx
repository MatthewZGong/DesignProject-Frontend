import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Job Board</h1>
      <p>
        <Link to="/updateInformation">Update your user information</Link>
      </p>
      <p>
        <Link to="/updatePreferences">Update your user preferences</Link>
      </p>
      <p>
        <Link to="/jobs">View all jobs</Link>
      </p>
      <p>
        <Link to="/deleteUser">Delete your account</Link>
      </p>
    </div>
  );
}

export default Home;


