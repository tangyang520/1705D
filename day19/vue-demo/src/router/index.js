import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/main',
    name: 'main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/main/Main.vue'),
    children:[
      {
        path:"/main/home",
        component:()=>import("../views/main/Home.vue")
      },
      {
        path:"/main/orderroom",
        component:()=>import("../views/main/Orderroom.vue")
      },
      {
        path:"/main/myorder",
        component:()=>import("../views/main/Myorder.vue")
      },
      {
        path:"/main/orderapprove",
        component:()=>import("../views/main/Orderapprove.vue")
      },
      {
        path:"/main/ordermanager",
        component:()=>import("../views/main/Ordermanager.vue")
      },
      {
        path:"/main/setting",
        component:()=>import("../views/main/Setting.vue")
      },
      {
        path:"/main",
        redirect:"/main/home"
      }
    ]
  },
  {
    path:"*",
    redirect:"/main"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
