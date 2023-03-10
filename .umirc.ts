import { IConfig } from 'umi-types';

import pxToViewPort from 'postcss-px-to-viewport';

// ref: https://umijs.org/config/
const config: IConfig = {
  proxy: {
    '/api': {
      target: 'http://localhost:54904/Admin',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  history: 'hash',
  treeShaking: true,
  routes: [
    {
      path: '/login',
      component: '../pages/login/index',
    },

    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/InsertStudent', component: '../pages/InsertStudent/index' },
        { path: '/', component: '../pages/index/index' },
        { path: '/MyZhaosheng', component: '../pages/MyZhaosheng/index' },
        { path: '/changePWD', component: '../pages/changePWD/index' },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: false,
        dva: true,
        dynamicImport: true,
        title: '渤海理工职业学院招生综合管理系统',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  cssLoaderOptions: {
    localIdentName: '[local]', // 配置这行
  },
  extraPostCSSPlugins: [
    pxToViewPort({
      viewportWidth: 750,
      viewportHeight: 1334,
      unitPrecision: 3,
      viewportUnit: 'vw',
      selectorBlackList: ['node_modules', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
    }),
  ],
  publicPath: '/m/',
};

export default config;
