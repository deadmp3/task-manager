import React from 'react';
import connect from '../../connect';

const mapStateToProps = ({ isAuthenticated, user }) =>
  ({ isAuthenticated, user });

@connect(mapStateToProps)
export default class Home extends React.Component {
  render() {
    const {
      isAuthenticated,
      user,
    } = this.props;
    return (
      <div className="container py-2 mt-3">
        <h1 className="display-4 text-center mt-5 mb-0">Welcome</h1>
        <p className="text-center">{isAuthenticated ? user.firstName : 'This is the task manager from Ivan' }</p>
      </div>);
  }
}
