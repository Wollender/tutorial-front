// 路由设置
const routers = [
  {
    path: '/',
    redirect: '/home'
  },
  {
  	path: '/login',
  	name: 'login',
  	meta: { title: '登录', navHidden: true },
    component:  r => require.ensure([], () => r(require('../views/login/index.vue')), 'manage/login')
  },
  {
  	path: '/register',
  	name: 'register',
  	meta: { title: '注册', navHidden: true },
    component:  r => require.ensure([], () => r(require('../views/register/index.vue')), 'manage/register')
  },
  {
    path: '/home',
    name: 'home',
    meta: { title: '首页',navHidden: true },
    component:  r => require.ensure([], () => r(require('../views/home/index.vue')), 'manage/home')
  },
  {
    path: '/baomingbox',
    name: 'baomingbox',
    meta: { title: '学院报名',navHidden: true },
    component:  r => require.ensure([], () => r(require('../views/baomingbox/index.vue')), 'manage/baomingbox'),
    children:[
      {
          path: '',
          redirect: {
              name: 'baoming'
          },
      },
      {
        path: 'form',
        name: 'form',
        meta: { title: '新增表单',navHidden: true },
        component:  r => require.ensure([], () => r(require('../views/form/index.vue')), 'manage/form')
      },
      {
        path: 'baoming',
        name: 'baoming',
        meta: { title: '学院报名',navHidden: true },
        component:  r => require.ensure([], () => r(require('../views/baoming/index.vue')), 'manage/baoming'),
      }
    ]
  }
]

module.exports = routers
