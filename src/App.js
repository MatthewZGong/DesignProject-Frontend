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
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="jobs" element={<Jobs />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
