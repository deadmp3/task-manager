import { createSelector } from 'reselect';

const getUsers = state => state.users;
export const usersSelector = createSelector(
  getUsers,
  users => Object.values(users),
);
