import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import detail from '@/components/detail'
import login from '@/components/login'
import loginin from '@/components/loginin'
import cart from '@/components/cart'
import makeorder from '@/components/makeorder'
import order from '@/components/order'
import myshop from '@/components/myshop'
import toinsertstoreuser from '@/components/toinsertstoreuser'
import goodscollection from '@/components/goodscollection'
<<<<<<< HEAD
import shoporder from '@/components/shoporder'
=======
import changeGoodsinfo from '@/components/changeGoodsinfo'
import insertgoodsinfo from '@/components/insertgoodsinfo'
>>>>>>> db2dab2b9e45693fe8a6f6c750c15df4ecd6130a

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
     {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/login',
      name: 'login',
      component:login
    },
    {
      path: '/loginin',
      name: 'loginin',
      component:loginin
    },
    {
      path: '/cart',
      name: 'cart',
      component:cart
    },
    {
      path: '/makeorder',
      name: 'makeorder',
      component:makeorder
    },
    {
      path: '/order',
      name: 'order',
      component:order
    },
    {

       path: '/toinsertstoreuser',
       name: 'toinsertstoreuser',
       component: toinsertstoreuser
     },
     {
        path: '/myshop',
        name: 'myshop',
        component: myshop
      },
		{
      path: '/goodscollection',
      name: 'goodscollection',
      component:goodscollection
    },
    {
<<<<<<< HEAD
      path: '/shoporder',
      name: 'shoporder',
      component:shoporder
=======
      path: '/changeGoodsinfo',
      name: 'changeGoodsinfo',
      component:changeGoodsinfo
    },
    {
      path: '/insertgoodsinfo',
      name: 'insertgoodsinfo',
      component:insertgoodsinfo
>>>>>>> db2dab2b9e45693fe8a6f6c750c15df4ecd6130a
    },
  ]
})
