import { IConfig } from 'umi-types';

import pxToViewPort from 'postcss-px-to-viewport';

// ref: https://umijs.org/config/
const config: IConfig = {
  history: 'hash',
  treeShaking: true,
  routes: [
    {
      path: '/insertEv',
      component: '../pages/insertEv/index'
    },
    {
      path: '/login',
      component: '../pages/login/index'
    },
    { path: '/ForgetPWD', component: '../pages/forgetPWD/index' },
    { path: '/StudentReg', component: '../pages/StudentReg/index' },
    { path: '/TeacherReg', component: '../pages/TeacherReg/index' },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index/index' },
        { path: '/EvaluateStudentList', component: '../pages/EvaluateStudentList/index' },
        { path: '/Start/:id', component: '../pages/Start/index' },
        { path: '/EvaluateToMe', component: '../pages/EvaluateToMe/index' },

        { path: '/ViewDetail/:id', component: '../pages/ViewDetail/index' },

      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: true,
      dynamicImport: false,
      title: '湖南师范大学PBL系统',
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
    }]
  ],
  cssLoaderOptions: {
    localIdentName: '[local]',  // 配置这行
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
  publicPath: "/m/"
}

export default config;
