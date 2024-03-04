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
  
// function MyForm() {
//     return (
//       <>
//         <label>
//           Text input: <input name="myInhiput" />
//         </label>
//         <hr />
//         <label>
//           Checkbox: <input type="checkbox" name="myCheckbox" />
//         </label>
//         <hr />
//         <p>
//           Radio buttons:
//           <label>
//             <input type="radio" name="myRadio" value="option1" />
//             Option 1
//           </label>
//           <label>
//             <input type="radio" name="myRadio" value="option2" />
//             Option 2
//           </label>
//           <label>
//             <input type="radio" name="myRadio" value="option3" />
//             Option 3
//           </label>
//         </p>
//       </>
//     );
//   }
  

export default jobsByPreferences;