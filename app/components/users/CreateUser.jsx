import React from 'react';
import CreateUserForm from './CreateUserForm';
import connect from '../../connect';

const mapStateToProps = ({ formErrors, userCreatingState }) =>
  ({ formErrors, userCreatingState });

@connect(mapStateToProps)
export default class CreateUser extends React.Component {
  componentWillUnmount() {
    this.props.clearFormErrors();
  }

  singUp = (values) => {
    const { history, createUser } = this.props;
    const afterSuccess = () => history.push('/');
    createUser(values, afterSuccess);
  };

  render() {
    const {
      formErrors,
      userCreatingState,
    } = this.props;
    return (
      <div className="container py-2 mt-3">
        <h1 className="display-4 text-center my-5">Sign Up</h1>
        <CreateUserForm
          singUp={this.singUp}
          userCreatingState={userCreatingState}
          formErrors={formErrors}
        />
      </div>
    );
  }
}
