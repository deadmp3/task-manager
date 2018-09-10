import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import * as common from './common';
import * as login from './login';
import * as users from './users';

export default combineReducers({
  ...common,
  ...login,
  ...users,
  form: formReducer,
});
