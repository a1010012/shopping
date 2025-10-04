import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import MyOrder from '@/views/myorder'
import Search from '@/views/search/index.vue'
import List from '@/views/search/list.vue'
import ProDetail from '@/views/prodetail'
import Pay from '@/views/pay'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'
import Cart from '@/views/layout/cart.vue'
import Home from '@/views/layout/home.vue'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/user', component: User },
        { path: '/cart', component: Cart },
        { path: '/category', component: Category },
        { path: '/home', component: Home }
      ]
    },
    { path: '/myorder', component: MyOrder },
    { path: '/search', component: Search },
    { path: '/searchlist', component: List },
    // 动态路由传参，确认将来是哪个商品
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay }
  ]
})
//定义一个数组，专门用户存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

//所有的路由在真正被访问之前（解析喧嚷对应组件面前），
//都会经过全局前置守卫，只有守卫放行，才会到对应的组件
//全局前置导航守卫，针对pay,myorder等需要登录的页面
// to:到哪里去，到哪去的完整路由对象（路径，参数）
//from:从哪里来，来自哪里的完整路由对象（路径，参数）
//next:放行函数，next()放行，next('/login')强制跳转到登录页
router.beforeEach((to, from, next) => {
  // console.log(to, from, next);
  //不是权限界面
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  //为权限界面，需要判断token
  const token = store.getters['user/token']
  console.log('路由守卫中的 token:', token) // ✅ 现在会正确打印 localStorage 中的 token
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
