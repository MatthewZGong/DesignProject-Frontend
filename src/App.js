import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Jobs from './Components/Jobs';
import Login from './Components/Login';
import CreateAccount from './Components/CreateAccount';
import Home from './Components/Home';
import UpdatePreferences from './Components/UpdatePreferences';
import User from './Components/User';
import UpdatePreferencesForm from './Components/UpdatePreferencesForm';
import UpdateInformation from './Components/UpdateInformation';

import { AuthProvider } from './AuthContext';

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
        <Route path="updatePreferences" element={<UpdatePreferences />} />
        <Route path="updatePreferencesForm" element={<UpdatePreferencesForm />} />
        <Route path="updateInformation" element={<UpdateInformation />} />
        <Route path="user" element={<User />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
