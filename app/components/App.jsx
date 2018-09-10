import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import Routes from './Routes';
import connect from '../connect';

const mapStateToProps = ({ isAuthenticated, user }) =>
  ({ isAuthenticated, user });

@connect(mapStateToProps)
export default class App extends React.Component {
  render() {
    const {
      isAuthenticated,
      user,
      logout,
    } = this.props;
    return (
      <React.Fragment>
        <Router>
          <React.Fragment>
            <Layout
              isAuthenticated={isAuthenticated}
              user={user}
              logout={logout}
            />
            <Routes isAuthenticated={isAuthenticated} />
          </React.Fragment>
        </Router>
      </React.Fragment>);
  }
}
