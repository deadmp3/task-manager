import { stringify } from 'query-string';
import { isString } from 'lodash';

const host = '/api/v1';

const makeUrl = (paths, query = {}) => {
  const arr = isString(paths) ? [paths] : paths;
  const pathname = [host, ...arr].join('/');
  const str = stringify(query);
  const queryStr = str ? `?${str}` : '';
  return `${pathname}${queryStr}`;
};

export default {
  loginUrl: () => makeUrl('login'),
  tokenUrl: () => makeUrl('login/token'),
  usersUrl: () => makeUrl('users'),
  userUrl: id => makeUrl(['users', id]),
};
