import env from './env';



const  apiBaseUrlBase = {
  prod: 'https://pbl.hunnu.edu.cn/Admin',
  development: 'http://localhost:54904/Admin',
};

export const  apiBaseUrl= apiBaseUrlBase[env]
