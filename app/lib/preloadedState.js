import jwt from 'jsonwebtoken';
import axios from 'axios';
import routes from '../routes';
import { getToken, getConfig } from './token';

const getUser = async (id, config) => {
  if (!id) {
    return {};
  }
  const { data: { user } } = await axios.get(routes.userUrl(id), config);
  return user;
};

export default async () => {
  const token = getToken();
  const { userId, isAuthenticated } = token ? jwt.decode(token) : {};
  const user = await getUser(userId, getConfig());
  return {
    userId,
    isAuthenticated,
    user,
  };
};
