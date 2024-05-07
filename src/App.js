import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Jobs from './Components/Jobs';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import User from './Components/User';
import UpdatePreferencesForm from './Components/UpdatePreferencesForm';
import UpdateInformation from './Components/UpdateInformation';
import Reports from './Components/Reports';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <BrowserRouter>
      {/* Wrap the application with AuthProvider for authentication */}
      <AuthProvider>
        {/* Render the Navbar component */}
        <Navbar />

        {/* Define the routes for different components */}
        <Routes>
          {/* Route for the home page */}
          <Route path="/" element={<Home />} />

          {/* Route for the jobs page */}
          <Route path="jobs" element={<Jobs />} />

          {/* Route for the login page */}
          <Route path="login" element={<Login />} />

          {/* Route for the create account page */}
          <Route path="createAccount" element={<CreateAccount />} />

          {/* Route for the update preferences form page */}
          <Route path="updatePreferencesForm" element={<UpdatePreferencesForm />} />

          {/* Route for the update information page */}
          <Route path="updateInformation" element={<UpdateInformation />} />

          {/* Route for the user page */}
          <Route path="user" element={<User />} />

          {/* Route for the reports page */}
          <Route path="Reports" element={<Reports />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;