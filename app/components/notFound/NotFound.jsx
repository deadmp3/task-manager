import React from 'react';
import connect from '../../connect';

const mapStateToProps = ({ isAuthenticated }) =>
  ({ isAuthenticated });

@connect(mapStateToProps)
export default class NotFound extends React.Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="container py-2 mt-3">
        <h1 className="display-4 text-center mt-5 mb-3">{isAuthenticated ? 'Page not found' : 'Permission denied' }</h1>
        <p className="text-center">{isAuthenticated ? '' : 'You must log in or register' }</p>
      </div>);
  }
}
