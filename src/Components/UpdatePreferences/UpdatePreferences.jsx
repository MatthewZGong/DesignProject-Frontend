import React, { useState } from 'react';

function JobsByPreferences() {
  const [numDays, setNumDays] = useState('');

  const handleShowJobs = () => {
    console.log(`Showing jobs from the most recent ${numDays} days`);
  };

  return (
    <div>
      <header>
        <h1>View Jobs by Preferences</h1>
      </header>
      <div>
        
        <label>
          Show Jobs from the most recent
          <input
            style={{ margin: '0 5px' }} 
            type="number"
            value={numDays}
            onChange={(e) => setNumDays(e.target.value)}
            placeholder="Number"
            min="1"
          />
          Days
        </label>
        <button onClick={handleShowJobs}>Enter</button>
      </div>
      <button onClick={() => window.location.href = '/updatePreferencesForm'}>Update Preferences</button>
    </div>
  );
}

export default JobsByPreferences;
