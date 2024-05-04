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
import User from './Components/User';
import DeleteUser from './Components/DeleteUser';
import UpdatePreferencesForm from './Components/UpdatePreferencesForm';
import UpdateInformation from './Components/UpdateInformation';
import Reports from './Components/Reports';

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
        <Route path="updatePreferencesForm" element={<UpdatePreferencesForm />} />
        <Route path="updateInformation" element={<UpdateInformation />} />
        <Route path="user" element={<User />} />
        <Route path="DeleteUser" element={<DeleteUser />} />
        <Route path="Reports" element={<Reports/>} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
