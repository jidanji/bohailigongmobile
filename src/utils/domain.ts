import env from './env';

const apiBaseUrlBase = {
  prod: 'http://112.126.83.123/Admin',
  development: '/api',
};

export const apiBaseUrl = apiBaseUrlBase[env];
