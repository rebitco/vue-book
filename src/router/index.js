import Vue from 'vue'
import Router from 'vue-router'

// 首屏全部加载改成动态加载
// import Home from '../components/Home.vue'
// import List from '../components/List.vue'
// import Collect from '../components/Collect.vue'
// import Add from '../components/Add.vue'
// import Detail from '../components/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 域名重定向, 例如路径错误或者空, 或者未找到该页面
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
      meta: { // 开启缓存
        keepAlive: true
      }
    },
    {
      path: '/list',
      component: () => import('../components/List.vue')
    },
    {
      path: '/collect',
      component: () => import('../components/Collect.vue')
    },
    {
      path: '/add',
      component: () => import('../components/Add.vue')
    },
    {
      path: '/detail/:bid',
      component: () => import('../components/Detail.vue'),
      name: 'detail' //
    }
  ]
})
