// This file contains the AuthContext and AuthProvider components for managing authentication state.
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// AuthProvider component manages the authentication state and provides it to child components.
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  // Update local storage when isLoggedIn or isAdmin state changes.
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    localStorage.setItem('isAdmin', isAdmin);
  }, [isLoggedIn, isAdmin]);

  // login function sets the user_id in local storage and updates the login and admin state.
  const login = (info, admin) => {
    localStorage.setItem('user_id', info);
    setIsLoggedIn(true);
    setIsAdmin(admin);
  };

  // logout function removes the user_id from local storage and resets the login and admin state.
  const logout = () => {
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook provides access to the AuthContext values.
export const useAuth = () => {
  return useContext(AuthContext);
};