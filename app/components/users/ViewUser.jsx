import React from 'react';
import connect from '../../connect';

const mapStateToProps = ({ viewUserFetchingState, viewUser }) => (
  { viewUserFetchingState, viewUser });

export default
@connect(mapStateToProps)
class ViewUser extends React.Component {
  componentDidMount = () => {
    const { history, fetchViewUser, match: { params: { id } } } = this.props;
    const afterEmpty = () => history.push('/users');
    fetchViewUser(id, afterEmpty);
  }

  renderUser() {
    const { viewUserFetchingState, viewUser } = this.props;
    if (!viewUser
      || viewUserFetchingState !== 'successed') {
      return null;
    }
    const {
      firstName,
      lastName,
      fullName,
      email,
    } = viewUser;
    return (
      <React.Fragment>
        <p className="qwerasdf text-center mb-5">{fullName}</p>
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="row">
              <div className="col-6 text-muted text-right">
                <p>First Name</p>
                <p>Last Name</p>
                <p>E-mail</p>
              </div>
              <div className="col-6">
                <p>{firstName}</p>
                <p>{lastName}</p>
                <p>{email}</p>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="container py-2 mt-3">
        <h1 className="display-4 text-center mt-5 mb-0">User</h1>
        {this.renderUser()}
      </div>
    );
  }
}