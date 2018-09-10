import React from 'react';
import { Link } from 'react-router-dom';
import { SignOut } from './auth';

const renderNavbar = ({ isAuthenticated, logout }) => {
  if (isAuthenticated) {
    return (
      <React.Fragment>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/users" href>Users</Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-item">
            <SignOut className="nav-link" logout={logout} />
          </li>
        </ul>
      </React.Fragment>);
  }
  return (
    <React.Fragment>
      <ul className="navbar-nav mr-auto" />
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" to="/signIn" href>Sign In</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signUp" href>Sign Up</Link>
        </li>
      </ul>
    </React.Fragment>);
};

export default props => (
  <div className="navbar navbar-expand-sm navbar-light bg-light">
    <Link className="navbar-brand" to="/" href>Task Manager</Link>
    {renderNavbar(props)}
  </div>);
