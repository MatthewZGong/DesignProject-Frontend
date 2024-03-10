import React from 'react';

function DeleteUser() {
    return (
      <div>
        <header>
          <h1>Delete User</h1>
          <button type="button" onClick={true}>Confirm to delete user</button>
        </header>
        <button onClick={() => window.location.href = '/Home'}>Cancel</button>
      </div>
    );
  }
  

export default DeleteUser;