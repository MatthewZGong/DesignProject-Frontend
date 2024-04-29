// This file contains the Navbar component and its related components and logic.
import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'View All Jobs', destination: '/jobs' },
];

// NavLink component renders a single navigation link.
function NavLink({ page }) {
  const { label, destination } = page;
  return (
    <li>
      <Link to={destination}>{label}</Link>
    </li>
  );
}

NavLink.propTypes = {
  page: propTypes.shape({
    label: propTypes.string.isRequired,
    destination: propTypes.string.isRequired,
  }).isRequired,
};

// Navbar component renders the navigation bar with links and user-related actions.
function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();

  return (
    <nav>
      <ul className="wrapper">
        {PAGES.map((page) => (
          <NavLink key={page.destination} page={page} />
        ))}
        {isLoggedIn && isAdmin && (
          <li>
            <Link to="/Reports">Reports</Link>
          </li>
        )}
        {isAdmin && (
          <li>
            <Link to="/delete-user">Delete User</Link>
          </li>
        )}
        <ul className="nav_bar_login">
          <li>
            <Link to={isLoggedIn ? '/user' : '/login'}>
              {isLoggedIn ? 'User' : 'Login'}
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link to="/" onClick={logout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </ul>
    </nav>
  );
}

export default Navbar;