import React from 'react';
import { withRouter } from 'react-router-dom';
import SignInForm from './SignInForm';
import connect from '../../connect';

const mapStateToProps = ({ formErrors, loginingState }) =>
  ({ formErrors, loginingState });

@connect(mapStateToProps)
@withRouter
export default class SignIn extends React.Component {
  componentWillUnmount() {
    this.props.clearFormErrors();
  }

  singIn = (values) => {
    const { history, login } = this.props;
    const afterSuccess = () => history.push('/');
    login(values, afterSuccess);
  };

  render() {
    const {
      formErrors,
      loginingState,
    } = this.props;
    return (
      <div className="container py-2 mt-3">
        <h1 className="display-4 text-center my-5">Sign in</h1>
        <SignInForm
          singIn={this.singIn}
          loginingState={loginingState}
          formErrors={formErrors}
        />
      </div>
    );
  }
}
