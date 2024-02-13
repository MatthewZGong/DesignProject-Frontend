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
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="login" element={<Login />} />
        <Route path="createAccount" element={<CreateAccount />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
