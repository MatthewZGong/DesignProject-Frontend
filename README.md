# Job Application App

This is a React application that provides various functionalities related to job applications and user management.

## Features

1. Navigation: The app includes a navbar component for easy navigation between different pages.
2. Authentication: The app uses an AuthProvider for authentication purposes.
3. Home Page: Displays the main landing page of the application.
4. Jobs Page: Allows users to view and interact with job listings.
    - users can view all jobs and search jobs 
    - by default recent jobs are displayed
    - users can search for jobs through a search bar that is powered by a vector search
5. Login: Provides a login page for users to authenticate and access their accounts.
6. Create Account: Allows new users to create an account.
7. Update Preferences: Enables users to update their job preferences.
8. Update Information: Allows users to update their personal information.
9. User Profile: Displays the user's profile information.
10. Delete User: Provides an option for users to delete their accounts.
11. Reports: Allows admins to read and interact with user related reports to job applications and user activity.

## Requirements
[Node.js](https://nodejs.org/en/download) is required for this.

## Getting started
0. Clone and cd into the repo
1. `npm install`
2. `./cloud.sh` or `./local.sh`

## Folder Structure

The application follows a standard React folder structure:

- `src/`
  - `Components/`
    - `Navbar.js`: Navigation bar
    - `Jobs.js`: Job display page and job-related api calls
    - `Login.js`: Login form
    - `CreateAccount.js`: Create account form
    - `Home.js`: Home page
    - `User.js`: User profile
    - `DeleteUser.js`: Deleting a user account
    - `UpdatePreferencesForm.js`: Updating user preferences form.
    - `UpdateInformation.js`: Updating user information
    - `Reports.js`: Generating Reports.
  - `App.js`: Main component
  - `AuthContext.js`: Authentication context provider
  - `App.css`: Styling
- `public/`
  - `index.html`: Main HTML file of the application.

## Dependencies

The application uses the following dependencies:

- `react`: JavaScript library for building user interfaces.
- `react-router-dom`: Routing library for React applications.
- `axios`: Promise-based HTTP client for making API requests.
