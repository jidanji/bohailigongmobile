import env from './env';

const apiBaseUrlBase = {
  prod: 'https://pbl.hunnu.edu.cn/Admin',
  development: '/api',
};

export const apiBaseUrl = apiBaseUrlBase[env];
