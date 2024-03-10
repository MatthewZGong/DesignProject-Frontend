import React from 'react';

function jobsByPreferences() {
    return (
      <div>
        <header>
          <h1>View Jobs by Preferences</h1>
          <button type="button" onClick={true}>Update User Preferences</button>
        </header>
        <button onClick={() => window.location.href = '/updatePreferencesForm'}>Update Preferences</button>
      </div>
    );
  }
  

export default jobsByPreferences;