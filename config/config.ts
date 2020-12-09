// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  history: {
    type: 'browser',
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/',
      component: '../layouts/BlankLayout',
      routes: [
        {
          path: '/user',
          component: '../layouts/UserLayout',
          routes: [
            {
              path: '/user',
              redirect: '/user/login',
            },
            {
              name: 'login',
              icon: 'smile',
              path: '/user/login',
              component: './user/login',
            },
            {
              name: 'register-result',
              icon: 'smile',
              path: '/user/register-result',
              component: './user/register-result',
            },
            {
              name: 'register',
              icon: 'smile',
              path: '/user/register',
              component: './user/register',
            },
            {
              component: '404',
            },
          ],
        },
        {
          path: '/',
          component: '../layouts/BasicLayout',
          Routes: ['src/pages/Authorized'],
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/dashboard/analysis',
            },
            {
              path: '/dashboard',
              name: 'dashboard',
              icon: 'dashboard',
              hideInMenu: true,
              routes: [
                {
                  path: '/',
                  redirect: '/dashboard/analysis',
                },
                {
                  name: 'analysis',
                  icon: 'smile',
                  path: '/dashboard/analysis',
                  component: './dashboard/analysis',
                },
              ],
            },
            {
              name:'数据交换',
              path:'/exchange',
              routes: [
                {
                  name:'数据交换',
                  path:'/data',
                  component: './Welcome'
                }
              ]
            },
            {
              name:'数据录入',
              path:'/entry',
              routes: [
                {
                  name:'全成本报表',
                  path:'/entry/index3',
                  component: './input/index3',
                },
                {
                  name:'收入费用明细表',
                  path:'/entry/index4',
                  component: './input/index4',
                },
                {
                  name:'收入数据',
                  path:'/entry/index6',
                  component: './input/index6',
                },
                {
                  name:'人力成本',
                  path:'/entry/index9',
                  component: './input/index9',
                },
                {
                  name:'物资成本',
                  path:'/entry/index7',
                  component: './input/index7',
                },
                {
                  name:'资产折旧',
                  path:'/entry/index8',
                  component: './input/index8',
                },
              ]
            },
            {
              name:'数据审核',
              path:'/audit',
              routes: [
                {
                  name:'人力成本审核',
                  path:'/audit/index9',
                  component: './input/index9',
                },
                {
                  name:'物资成本审核',
                  path:'/audit/index2',
                  component: './check/index2',
                },
                {
                  name:'资产折旧审核',
                  path:'/audit/index3',
                  component: './check/index3',
                },
                {
                  name:'无形资产审核',
                  path:'/audit/index5',
                  component: './check/index5',
                },
                {
                  name:'风险基金审核',
                  path:'/audit/eiskRatio',
                  component: './eiskRatio'
                },
                {
                  name:'其他成本审核',
                  path:'/audit/index7',
                  component: './check/index7',
                },
                {
                  name:'间接成本审核',
                  path:'/audit/index8',
                  component: './check/index8',
                },
                {
                  name:'数据核对（成本+收入）',
                  path:'/audit/index11',
                  component: './input/index11',
                },
              ]
            },
            {
              name:'数据整理',
              path:'/settle',
              routes: [
                {
                  name:'收入收据整理',
                  path:'/settle/index6',
                  component: './input/index6',
                },
                {
                  name:'物资数据整理（无）',
                  path:'/settle/1',
                  component: './Welcome'
                },
                {
                  name:'资产数据整理/资产折旧',
                  path:'/settle/index8',
                  component: './input/index8',
                },
                {
                  name:'材料专属查询',
                  path:'/settle/exclusiveMaterial',
                  component: './exclusiveMaterial'
                },
                {
                  name:'资产专属查询（未）',
                  path:'/settle/2',
                  component: './Welcome'
                },
                {
                  name:'收入收据整理（无）',
                  path:'/settle/3',
                  component: './Welcome'
                },
              ]
            },
            {
              name:'成本计算',
              path:'/cal',
              routes: [
                {
                  name:'科室成本归集',
                  path:'/settle/index13',
                  component: './check/index13',
                },
                {
                  name:'科室项目成本',
                  path:'/settle/index1',
                  component: './check/index1',
                },
                {
                  name:'全院项目成本',
                  path:'/settle/index1',
                  component: './check/index1',
                },
                {
                  name:'科室收入成本核对',
                  path:'/settle/index17',
                  component: './check/index17',
                },
                {
                  name:'原始归集结果',
                  path:'/settle/index18',
                  component: './check/index18'
                },
                {
                  name:'全院成本核对',
                  path:'/settle/index19',
                  component: './check/index19',
                },
              ]
            },
            {
              name:'基础设置',
              path:'/setting',
              routes: [
                {
                  name:'字典设置',
                  path:'/setting/dic',
                  routes:[
                    {
                      name:'成本科室',
                      path:'/setting/dic/index13',
                      component: './input/index13',
                    },
                    {
                      name:'核算科室（无）',
                      path:'/setting/dic',
                      component: './Welcome',
                    },
                    {
                      name:'收费项目',
                      path:'/setting/dic/index12',
                      component: './input/index12',
                    }
                  ]
                },
                {
                  name:'关系设置',
                  path:'/setting/relation',
                  routes: [
                    {
                      name:'成本科室关系',
                      path:'/setting/relation/index13',
                      component: './input/index13',
                    },
                    {
                      name:'核算科室关系（未）',
                      path:'/setting/relation',
                      component: './input/index14',
                    }
                  ]
                }
              ]
            },
            {
              component: '404',
            },
          ],
        },
      ],
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  exportStatic: {},
  esbuild: {},
});
