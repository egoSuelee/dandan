import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	selectedIndex:0, //底部tabbar选中的索引值
	cartList:[], //购物车中所有商品数据源
	selectedCartList:[], //订单结算的时候, 被选中的商品数据源
	freight:null, //订单运费
	payWays:[],	//支付方式种类
	defaultOrderAddress:{},	//订单默认地址
	defaultOrderStoreAddress:{}, //默认服务门店的地址
	orderTotalMoney:null,
	userInfo:{}, //用户信息 -- cStoreNo, userNo, tel, img etc.
	currentServiceStore: {},	//当前页面(订单, 新增/修改地址)用户服务门店地址
	currentUserAddress: {},	//用户配送地址
	/*添加用户地址的时候*/
	currentUserName: null,
	currentUserTel: null,
	currentUserAddressDetails: null,
	editingUserAdress:null,
	selectedTransportWay:0,
	selectedOrderTypeIndex: 0 //查看订单类型样式选择/* <!--0 待付款/ 1 待发货/ 2 待取货 /3 待收货 /4 已完成--> */
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})