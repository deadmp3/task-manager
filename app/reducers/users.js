import { handleActions } from 'redux-actions';
import { keyBy, omit } from 'lodash';
import * as actions from '../actions';

export const userCreatingState = handleActions({
  [actions.createUserRequest]() {
    return 'requested';
  },
  [actions.createUserSuccess]() {
    return 'successed';
  },
  [actions.createUserFailure]() {
    return 'failed';
  },
}, 'none');

export const userId = handleActions({
  [actions.loginSuccess](state, { payload: { userId: id } }) {
    return id;
  },
  [actions.logoutSuccess]() {
    return '';
  },
}, '');

export const user = handleActions({
  [actions.loginSuccess](state, { payload: { user: u } }) {
    return u;
  },
  [actions.logoutSuccess]() {
    return null;
  },
}, null);

export const users = handleActions({
  [actions.fetchUsersSuccess](state, { payload: { users: u } }) {
    return keyBy(u, 'id');
  },
}, {});

export const viewUserFetchingState = handleActions({
  [actions.fetchViewUserRequest]() {
    return 'requested';
  },
  [actions.fetchViewUserSuccess]() {
    return 'successed';
  },
  [actions.fetchViewUserFailure]() {
    return 'failed';
  },
}, 'none');

export const viewUser = handleActions({
  [actions.fetchViewUserSuccess](state, { payload: { user: u } }) {
    return u;
  },
}, null);