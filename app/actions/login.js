import { createAction } from 'redux-actions';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { getDeviceId, saveToken, connectUpdateToken, disconnectUpdateToken } from '../lib/token';
import routes from '../routes';

const getLoginConfig = () => ({
  headers: { 'device-id': getDeviceId() },
});

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');
export const loginFailure = createAction('LOGIN_FAILURE');
export const login = (credentials, afterSuccess) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data: { token, user } } =
      await axios.post(routes.loginUrl(), credentials, getLoginConfig());
    dispatch(loginSuccess({ user, ...jwt.decode(token) }));
    saveToken(token);
    connectUpdateToken();
    afterSuccess();
  } catch (err) {
    console.log(err);
    dispatch(loginFailure({ err }));
  }
};

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');
export const logoutFailure = createAction('LOGOUT_FAILURE');

export const handleLogout = (dispatch, afterSuccess) => {
  dispatch(logoutSuccess());
  saveToken();
  disconnectUpdateToken();
  afterSuccess();
};

export const logout = afterSuccess => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    await axios.delete(routes.loginUrl(), getLoginConfig());
    handleLogout(dispatch, afterSuccess);
  } catch (err) {
    console.log(err);
    dispatch(logoutFailure({ err }));
  }
};
