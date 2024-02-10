import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import './App.css';

import Navbar from './Components/Navbar';
import Jobs from './Components/Jobs';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="jobs" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
