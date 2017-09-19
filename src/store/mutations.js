import {
	MODIFY_HOMEINDEX,
	ADD_CART,
	REDUCE_CART,
  REMOVE_CART,
  INIT_SHOPCART,
  SET_SELECTED_CARTGOODS,
  SET_ORDER_FREIGHT,
  SET_ORDER_PAYWAYS,
  SET_ORDER_DEFAULTADDRESS,
  SET_ORDER_DEFAULT_STOREADDRESS,
  SET_ORDER_TOTALMONEY,
  USER_LOGIN_SUCCESS,
  INIT_USERINFO_FROMLOCAL,
  SET_CURRENT_SERVICE_STORE,
  SET_CURRENT_USER_ADDRESS,
  SET_CURRENT_ADDRESS_USER_NAME,
  SET_CURRENT_ADDRESS_USER_TEL,
  SET_CURRENT_ADDRESS_USER_DETAIL,
  SET_EDITING_USER_ADDRESS,
  MODIFY_TRANSPORTWAY,
  MODIFY_ORDER_SELECTEDTYPEINDEX
} from './mutation-types.js'

import {
	setStore,
	getStore,
} from '../config/mUtils'

export default {
  /*
  * 更改底部导航的选中的index值
  */
	  [MODIFY_HOMEINDEX](state, {
   		 selectedIndex
  	}) {
    	state.selectedIndex = selectedIndex;
  	},
    /*
    * 购物车商品+1
    */
    [ADD_CART](state, {
  		cGoodsNo,
  		cGoodsImagePath,
  		RowNumber,
  		Show_Level,
  		bFresh,
  		bOnLine_Price,
  		cGoodsName,
  		cSpec,
  		cUnit,
  		fNormalPrice,
  		fVipPrice
  	}) {
  		let cart = state.cartList;
  		/*这里使用goodsNo作为id值*/
  		let goods = cart[cGoodsNo];
  		if (goods) {
  			goods['goodsCount']++;
  		} else {
  			cart[cGoodsNo] = {
  				"goodsCount" : 1,
  				"cGoodsImagePath": cGoodsImagePath,
		  		"RowNumber": RowNumber,
		  		"Show_Level": Show_Level,
		  		"bFresh": bFresh,
		  		"bOnLine_Price": bOnLine_Price,
		  		"cGoodsName": cGoodsName,
		  		"cSpec": cSpec,
		  		"cUnit": cUnit,
		  		"fNormalPrice": fNormalPrice,
		  		"fVipPrice": fVipPrice
  			}
  		}
  		state.cartList = {...cart};
  		//存入localStorage
		  setStore('shopCart', state.cartList);
  	},
    /*
    * 购物车商品-1, 如果商品数量为1的话, 那么就是从购物车中移除商品
    */
    [REDUCE_CART](state, {
      cGoodsNo
  	}) {
      let cart = state.cartList;
      console.log('REDUCE_CART----', cGoodsNo);
      
      let goods = cart[cGoodsNo];
      if (goods) {
        let goodsIndex = null
        Object.keys(cart).forEach((element, index) => {
            if (element == cGoodsNo) {
              goodsIndex = index;
            } 
        });
   
        if (goods['goodsCount'] && goods['goodsCount'] > 1) {
          goods['goodsCount']--;
          state.cartList = {...cart};
          setStore('shopCart', state.cartList);
        } else {
          delete cart[cGoodsNo];
          state.cartList = {...cart};
          setStore('shopCart', state.cartList);
        }
      }
  	},
    [REMOVE_CART](state, {
      removedcGoodsNo
    }) {
      if (removedcGoodsNo) {
        let cart = state.cartList;
        console.log("REMOVE_CART------", removedcGoodsNo);
        let goods = cart[removedcGoodsNo];
        if (goods) {
          delete cart[removedcGoodsNo];
          state.cartList = {...cart};
          setStore('shopCart', state.cartList);
        }
      }
    },
    /*
    * 从本地localStorage中读取购物车, 保存在vuex中
    */
    [INIT_SHOPCART](state) {
      let initCart = getStore('shopCart');
      if (initCart) {
          state.cartList = JSON.parse(initCart);
        }
    },
    /*
    * 保存购物车中选中的商品, 用于订单结算的时候使用
    */
    [SET_SELECTED_CARTGOODS](state, {
      selectedcGoodsNo
    }) {
      if (selectedcGoodsNo) {
        if (typeof selectedcGoodsNo == 'object') {
          let cGoodsNoValues = Object.values(selectedcGoodsNo);
          let selectedCart = state.selectedCartList;
          let cart         = state.cartList;
          cGoodsNoValues.forEach((value, index) => {
            if(cart[value]) {
              selectedCart[value] = cart[value];
            }
          });
          state.selectedCartList = {...selectedCart};
        }
      } else {
        // 当selectedcGoodsNo为空的时候, 就是清除所有已选商品.
        state.selectedCartList = {}
      }
    },
    /*
    * 跳转订单页面的时候, 请求运费信息 / 支付方式 / 默认收货地址 / 默认服务门店地址
    */
    [SET_ORDER_FREIGHT](state, {
      freight
    }) {
      state.freight = freight;
      
    },

    [SET_ORDER_PAYWAYS](state, {
      payways
    }) {
   
      if (typeof payways == 'object') {
        let payways_arrays = Object.values(payways);
        state.payways = {...payways_arrays};
        
      }
    },

    [SET_ORDER_DEFAULTADDRESS](state, {
      defaultOrderAddress
    }) {
      if (typeof defaultOrderAddress == 'object') {
        state.defaultOrderAddress = defaultOrderAddress;
       
      }
    },

    [SET_ORDER_DEFAULT_STOREADDRESS](state, {
      defaultOrderStoreAddress
    }) {
      if (typeof defaultOrderStoreAddress == 'object') {
        state.defaultOrderStoreAddress = defaultOrderStoreAddress;

      }
    },
    /*
    * 获取订单总金额
    */
    [SET_ORDER_TOTALMONEY](state, {
      orderTotalMoney
    }) {
      if (orderTotalMoney) {
        state.orderTotalMoney = orderTotalMoney;
   
      }
    },
    /*
    * 用户登录成功
    */
    [USER_LOGIN_SUCCESS](state, {
      userInfo
    }) {
      if (userInfo) {
        state.userInfo = userInfo
        setStore('userInfo', userInfo);
      }
    },
    /*
    * 根据本地信息初始化用户信息
    */
    [INIT_USERINFO_FROMLOCAL](state) {
      let initUserInfo = getStore('userInfo');
      if (initUserInfo) {
        state.userInfo = JSON.parse(initUserInfo);
      } else {
        state.userInfo = {};
      }
    },
    /*
    * 设置用户当前服务门店, (1)新增/修改地址 (2)生成订单的时候使用
    */
    [SET_CURRENT_SERVICE_STORE](state, {
      currentServiceStore
    }) {
      if (currentServiceStore) {
        state.currentServiceStore = currentServiceStore;
      }
    },
    /*
    * 设置用户当前的配送地址, (1)新增/修改地址 (2)生成订单的时候使用
    */
    [SET_CURRENT_USER_ADDRESS](state, {
      currentUserAddress
    }) {
      if (currentUserAddress) {
        state.currentUserAddress = currentUserAddress;
      }
    },
    /*
    * 设置用户当前的姓名, 手机号以及门牌号
    */
    [SET_CURRENT_ADDRESS_USER_NAME] (state, {
      currentUserName
    }) {
      if (currentUserName) {
        state.currentUserName = currentUserName
      } else {
        state.currentUserName = null
      }
    },
    [SET_CURRENT_ADDRESS_USER_TEL] (state, {
      currentUserTel
    }) {
      if (currentUserTel) {
        state.currentUserTel = currentUserTel
      } else {
        state.currentUserTel = null
      }
    },
    [SET_CURRENT_ADDRESS_USER_DETAIL] (state, {
      currentUserAddressDetails
    }) {
      if (currentUserAddressDetails) {
        state.currentUserAddressDetails = currentUserAddressDetails
      } else {
        state.currentUserAddressDetails = null
      }
    },
    /*
    * 编辑用户地址
    */
    [SET_EDITING_USER_ADDRESS] (state, {
      editingUserAdress
    }) {
      if (editingUserAdress) {
        state.editingUserAdress = editingUserAdress;
      }
    },
    /*
    * 更改配送方式
    */
    [MODIFY_TRANSPORTWAY](state, {
      selectedWay
    }) {
        state.selectedTransportWay = selectedWay;
    },
    [MODIFY_ORDER_SELECTEDTYPEINDEX](state, {
      selectedOrderTypeIndex
    }) {
        state.selectedOrderTypeIndex = selectedOrderTypeIndex;
    }
}

