import App from '../App'
import Home from '../pages/home/home'  				//首页
import category from '../pages/category/category'	//分类页面
import shopCart from '../pages/shopCart/shopCart'	//购物车页面
import orderSettlement from '../pages/shopCart/orderSettlement' //订单结算页面
import orderPay from '../pages/shopCart/orderPay'
import profile  from '../pages/profile/profile'		//个人中心


/*
* 签到页面
*/
import sign from '../pages/home/sign'
import download from '../pages/home/download'
import sign2 from '../pages/home/sign2'
import successSign from '../pages/home/successSign'
/*
* 商品详情页
*/

import goodsDetail from '../pages/category/goodsDetail' //商品详情页
import search from '../pages/category/search' //搜索页面

/*
*  地址管理页面
*/
import address from '../pages/profile/events/address/address' //收货地址管理
import operateAddress from '../pages/profile/events/address/operateAddress' //新增收货地址
import chooseServiceStore from '../pages/profile/events/address/chooseServiceStore' //选择服务门店
import goodsList from '../components/common/goodsList' //商品列表视图 -- 用作测试使用
import bmkAddress from '../pages/profile/events/address/bmkAddress' //从百度地图选择地址
import chooseAddress from '../pages/profile/events/address/chooseAddress'

/*
*  订单管理页面
*/

import allOrders from '../pages/profile/events/orders/allOrders'
import unpay from '../pages/profile/events/orders/unpay' //待付款
import unpost from '../pages/profile/events/orders/unpost'  //待发货
import unget from '../pages/profile/events/orders/unget'  //待取货
import unreceive from '../pages/profile/events/orders/unreceive'  //待收货
import completed from '../pages/profile/events/orders/completed'  //已完成

/*
* 用户管理页面
*/
import login from '../pages/profile/events/account/login' //登录页面
import register from '../pages/profile/events/account/register' //注册页面
import forgetPassword from '../pages/profile/events/account/forgetPassword' //找回密码
import modifyPayword from '../pages/profile/events/account/modifyPayword'
/*
*  钱包管理页面
*/
import wallet from '../pages/profile/events/wallet/wallet'

/*
* 贴心小功能
*/
import feedback from '../pages/profile/events/tips/feedback'
import editUserInfo from '../pages/profile/events/tips/editUserInfo'




export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
        path: '/',
        name: 'home',
        component: Home
        },
        {
          path: '/category',
          name: 'category',
          component: category
        },
        {
          path: '/sign',
          name: 'sign',
          component: sign
        },
        {
          path: '/sign2',
          name: 'sign2',
          component: sign2
        },
        {
          path: '/successSign/:UserNo',
          name: 'successSign',
          component: successSign
        },
        {
          path: '/download',
          name: 'download',
          component: download
        },
        {
          path: '/goodsDetail/:cGoodsNo',
          name: 'goodsDetail',
          component: goodsDetail
        },
        {
          path: '/search',
          name: 'search',
          component: search
        },
        {
          path: '/shopcart',
          name: 'shopCart',
          component: shopCart
        },
        {
          path: '/orderSettlement',
          name: 'orderSettlement',
          component: orderSettlement
        },
        {
          path: '/profile',
          name: 'profile',
          component: profile,
          children: [
          {
            path: 'address',
            name: 'address',
            component: address
          }
          ]
        },
        {
          path: '/address',
          component: address
        }, 
        {
          path: '/operateAddress',
          component: operateAddress
        },
        {
          path: '/chooseServiceStore',
          component: chooseServiceStore
        },
        {
          path: '/goodsList',
          component: goodsList
        },
        {
          path: '/bmkAddress',
          component: bmkAddress
        }, 
        {
          path: '/chooseAddress',
          component: chooseAddress
        },
        {
          path: '/orderPay/:orderSheetNo',
          component: orderPay
        }, 
        {
          path: '/allOrders',
          component: allOrders,
          children: [
            {
              path: '/',
              component: unpay
            },
            {
              path: '/unpost',
              component: unpost
            },
            {
              path: '/unget',
              component: unget
            }, 
            {
              path: '/unreceive',
              component: unreceive
            },
            {
              path: '/completed',
              component: completed
            }
          ]
        }, 
        {
          path: '/login',
          component: login
        },
        {
          path: '/register',
          component: register
        },
        {
          path: '/forgetPassword',
          component: forgetPassword
        },
        {
          path: '/modifyPayword',
          name: 'modifyPayword',
          component: modifyPayword
        },
        {
          path: '/wallet',
          component: wallet
        }, 
        {
          path: '/feedback',
          component: feedback
        }, 
        {
          path: '/editUserInfo',
          component: editUserInfo
        }
      ]
  }]
