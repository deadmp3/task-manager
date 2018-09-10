import { handleActions } from 'redux-actions';
import * as actions from '../actions';

const clearFormErrors = () => ({});
const setFormErrors = (state, { payload: { err } }) => {
  if (err) {
    const { data: { formErrors: fe = {} } } = err.response;
    return fe;
  }
  return {};
};

export const formErrors = handleActions({
  [actions.clearFormErrors]: clearFormErrors,
  [actions.loginSuccess]: clearFormErrors,
  [actions.loginFailure]: setFormErrors,
  [actions.logoutSuccess]: clearFormErrors,
  [actions.logoutFailure]: setFormErrors,
  [actions.createUserSuccess]: clearFormErrors,
  [actions.createUserFailure]: setFormErrors,
}, {});
