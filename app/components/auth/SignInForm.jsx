import React from 'react';
import { Form, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { Field } from '../common-jsx';

@reduxForm({ form: 'SignInForm' })
export default class SignInForm extends React.Component {
  componentDidMount = () => document.getElementById('email').focus()

  render() {
    const {
      formErrors,
      loginingState,
      handleSubmit,
      singIn,
    } = this.props;
    const disabled = loginingState === 'requested';
    return (
      <Form className="row justify-content-center" action="" onSubmit={handleSubmit(singIn)}>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          <Field name="email" id="email" type="email" placeholder="E-mail" err={formErrors.email} />
          <Field name="password" type="password" placeholder="Password" err={formErrors.password} />
          <Button className="btn-block" color="primary" type="submit" disabled={disabled}>Sign in</Button>
        </div>
      </Form>
    );
  }
}
