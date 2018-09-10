import jwt from 'jsonwebtoken';
import axios from 'axios';
import uuidv4 from 'uuid/v4';
import routes from '../routes';

export const getDeviceId = () => {
  const deviceId = localStorage.getItem('deviceId');
  if (deviceId) {
    return deviceId;
  }
  const newDeviceId = uuidv4();
  localStorage.setItem('deviceId', newDeviceId);
  return newDeviceId;
};

export const authorization = token => `Bearer ${token}`;
const getTokenConfig = token => ({
  headers: {
    'device-id': getDeviceId(),
    authorization: authorization(token),
  },
});

export const getToken = () => localStorage.getItem('token') || '';

export const saveToken = (token = '') => localStorage.setItem('token', token);

const updateToken = async () => {
  const token = getToken();
  if (!token) {
    return;
  }
  try {
    const { data: { token: newToken } } =
      await axios.put(routes.tokenUrl(), {}, getTokenConfig(token));
    saveToken(newToken);
  } catch (err) {
    const { status } = err.response;
    if (status === 422) {
      saveToken('');
    } else {
      console.log(err);
    }
  }
};

const delayUpdatingToken = () => {
  const token = getToken();
  if (!token) {
    return 0;
  }
  const { exp } = jwt.decode(token);
  return (exp - (Date.now() / 1000) - 10) * 1000;
};

let updateTokenTimerId;
export const disconnectUpdateToken = () => {
  if (updateTokenTimerId) {
    clearTimeout(updateTokenTimerId);
  }
};
export const connectUpdateToken = () => {
  const token = getToken();
  if (token) {
    disconnectUpdateToken();
    updateTokenTimerId = setTimeout(async () => {
      await updateToken();
      connectUpdateToken();
    }, delayUpdatingToken());
  }
};

export const initToken = async () => {
  if (delayUpdatingToken() < 0) {
    await updateToken();
  }
  connectUpdateToken();
};

export const getConfig = (config = {}) => {
  const token = getToken();
  return {
    ...config,
    headers: {
      ...(config.headers || {}),
      authorization: authorization(token),
    },
  };
};
