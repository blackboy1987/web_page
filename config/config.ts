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
              name: '数据录入',
              path: '/input',
              routes: [
                {
                  name: '资产负债表',
                  path: '/input/index1',
                  component: './input/index1',
                },
                {
                  name: '收入费用总表',
                  path: '/input/index2',
                  component: './input/index2',
                },
                {
                  name: '全成本报表录入',
                  path: '/input/index3',
                  component: './input/index3',
                },
                {
                  name: '收入报表录入',
                  path: '/input/index4',
                  component: './input/index4',
                },
                {
                  name: '数字及财务分析表',
                  path: '/input/index5',
                  component: './input/index5',
                },
                {
                  name: '收入频次录入',
                  path: '/input/index6',
                  component: './input/index6',
                },
                {
                  name: '材料明细录入',
                  path: '/input/index7',
                  component: './input/index7',
                },
                {
                  name: '资产折旧录入',
                  path: '/input/index8',
                  component: './input/index8',
                },
                {
                  name: '人员经费录入',
                  path: '/input/index9',
                  component: './input/index9',
                },
                {
                  name: '医疗机构病房构成明细表',
                  path: '/input/index10',
                  component: './input/index10',
                },
                {
                  name: '收入数据核对',
                  path: '/input/index11',
                  component: './input/index11',
                },
                {
                  name: '收费项目对照',
                  path: '/input/index12',
                  component: './input/index12',
                },
                {
                  name: '成本科室对照',
                  path: '/input/index13',
                  component: './input/index13',
                },
              ]
            },
            {
              name: '核算平台',
              path: '/check',
              routes: [
                {
                  name: '收入审定',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '卫生材料费审定',
                  path: '/check/index2',
                  component: './check/index2',
                },
                {
                  name: '资产折旧费审定',
                  path: '/check/index3',
                  component: './check/index3',
                },
                {
                  name: '人员经费审核',
                  path: '/check/index4',
                  component: './check/index4',
                },
                {
                  name: '无形资产审核',
                  path: '/check/index5',
                  component: './check/index5',
                },
                {
                  name: '风险基金审核',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '其他费用审核',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '间接费用审核',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '全院药事服务费用',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '特殊项目(手工)',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '特殊项目(系统)',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '诊查费项目',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '外协项目',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '科室成本归集',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '科室项目成本',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '科室成本收入比',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '全院项目成本',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '医院标准项目结果',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '未匹配项目结果',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '床位费测算',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '科室收入成本核对',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '原始归集结果核对',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '全院总成本核对',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '解锁医院数据',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '有成本无收入',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '成本数据校验',
                  path: '/check/index1',
                  component: './check/index1',
                },
                {
                  name: '编码名称校验',
                  path: '/check/index1',
                  component: './check/index1',
                },
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
