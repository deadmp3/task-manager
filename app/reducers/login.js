import { handleActions } from 'redux-actions';
import * as actions from '../actions';

export const loginingState = handleActions({
  [actions.loginRequest]() {
    return 'requested';
  },
  [actions.loginSuccess]() {
    return 'successed';
  },
  [actions.loginFailure]() {
    return 'failed';
  },
}, 'none');

export const logoutingState = handleActions({
  [actions.logoutRequest]() {
    return 'requested';
  },
  [actions.logoutSuccess]() {
    return 'successed';
  },
  [actions.logoutFailure]() {
    return 'failed';
  },
}, 'none');

export const isAuthenticated = handleActions({
  [actions.loginSuccess](state, { payload: { isAuthenticated: isA } }) {
    return isA;
  },
  [actions.logoutSuccess]() {
    return false;
  },
}, false);
