import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to the Job Portal</h1>
      <Link to="/Login">User Login</Link>
      <br />
      <Link to="/CreateAccount">Create Account</Link>
    </div>
  );
}

export default Home;
