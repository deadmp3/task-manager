import React from 'react';
import { usersSelector } from '../../selectors';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    users: usersSelector(state),
  };
  return props;
};

@connect(mapStateToProps)
export default class Users extends React.Component {
  componentDidMount = () => this.props.fetchUsers()

  handleClick = id => () => {
    const { history } = this.props;
    history.push(`/users/${id}`);
  }

  render() {
    const { users } = this.props;
    return (
      <div className="container py-2 mt-3">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <table className="table table-hover">
              <thead className="thead-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map(({ id, fullName, email }) => (
                  <tr key={id} onClick={this.handleClick(id)}>
                    <td>{fullName}</td>
                    <td>{email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
