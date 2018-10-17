import { createAction } from 'redux-actions';
import axios from 'axios';
import { pick } from 'lodash';
import { login } from './login';
import { getConfig } from '../lib/token';
import routes from '../routes';

export const createUserRequest = createAction('USER_CREATE_REQUEST');
export const createUserSuccess = createAction('USER_CREATE_SUCCESS');
export const createUserFailure = createAction('USER_CREATE_FAILURE');
export const createUser = (attributes, afterSuccess) => async (dispatch) => {
  dispatch(createUserRequest());
  try {
    const { data: { user } } = await axios.post(routes.usersUrl(), { attributes }, getConfig());
    dispatch(createUserSuccess({ user }));
    login(pick(attributes, ['email', 'password']), afterSuccess)(dispatch);
  } catch (err) {
    console.log(err);
    dispatch(createUserFailure({ err }));
  }
};

export const fetchUsersRequest = createAction('USERS_FETCH_REQUEST');
export const fetchUsersSuccess = createAction('USERS_FETCH_SUCCESS');
export const fetchUsersFailure = createAction('USERS_FETCH_FAILURE');
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersRequest());
  try {
    const { data: { users } } = await axios.get(routes.usersUrl(), getConfig());
    dispatch(fetchUsersSuccess({ users }));
  } catch (err) {
    console.log(err);
    dispatch(fetchUsersFailure({ err }));
  }
};

export const fetchViewUserRequest = createAction('VIEW_USER_FETCH_REQUEST');
export const fetchViewUserSuccess = createAction('VIEW_USER_FETCH_SUCCESS');
export const fetchViewUserFailure = createAction('VIEW_USER_FETCH_FAILURE');
export const fetchViewUser = (id, afterEmpty) => async (dispatch) => {
  dispatch(fetchViewUserRequest());
  try {
    const { data: { user } } = await axios.get(routes.userUrl(id), getConfig());
    dispatch(fetchViewUserSuccess({ user }));
    if (!user) {
      afterEmpty();
    }
  } catch (err) {
    console.log(err);
    dispatch(fetchViewUserFailure({ err }));
  }
};
