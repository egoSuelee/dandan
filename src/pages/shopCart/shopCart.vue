<template>
	<div class="shopCartWrapper">
		<headerGuide :title= "headerTitle"></headerGuide>
		<div v-if='!isEmpty' class="shopCart-box">
			<div class="shopCart-list">
				<ul>
					<li v-for = '(goods,index) in goodsList' class="goods-item"> 
						<div class="checkboxWrapper">
						   <span class="checkbox" :class = "{'selectedGoods':goods.isSelected}" @touchstart = "reverseGoodsState(goods)">
						   		<i class="dandan-uniE900"></i>
						   </span>
						</div>
						<div class="contentWrapper">
							<div class="iconWrapper">
								<img :src="getImgPath(goods.cGoodsImagePath)" />
							</div>
							<div class="goodsInfoWrapper">
								<h2>{{goods.cGoodsName}}</h2>
								<p>¥{{parseFloat(goods.bOnLine_Price)}}</p>
							</div>
							<div class="decrIncrWrapper">
								<div class="baseWrapper">
									<span class="decrease" @touchstart = "decrease_goods(goods, index)">
										<i class="dandan-uniE901"></i>
									</span>
									<span class="counts">{{parseInt(goods.goodsCount)}}</span>
									<span class="increase" @touchstart = "increase_goods(goods)">
										<i class="dandan-uniE902"></i>
									</span>
								</div>
							</div>
						</div>
						<div class="bottom-line"></div>
					</li>
				</ul>
			</div>
			<div class="settmentWrapper">
				<span class="leftWrapper">
					<div class="checkboxWrapper">
					  <span class="checkbox" :class = "{'isSelectedAll':isSelectedAll}" @touchstart = "isSelectedAllClick()"><i class="dandan-uniE900"></i></span>
					</div>
					<div class="contentWrapper">
						<span class="totalPrice">合计¥:{{(parseFloat(totalPrice)).toFixed(2)}}元</span>
					</div>
				</span>
				<span class="rightWrapper" @touchstart = "settmentDidClick()">
					<p>结算</p>
				</span>
			</div>
		</div>
		<div v-if='isEmpty' class="emptyShopCart-box">
			<div class="emptyWrapper">
				<div class="emptyGirlWrapper">
					<img src = '/static/empty_shopcart_girl.png' />
				</div>
				<div class="title"><span>购物车空空如也</span></div>
				<div class="shop-button" @touchstart="toShopping()"><span>去购物</span></div>
			</div>
		</div>
		<alertTip v-if="showAlert" :alertText="alertText" :isShowLoginBtn = "isShowLoginBtn" @login="login" @closeTip = "showAlert=false"></alertTip>
		<footerGuide></footerGuide>
	</div>
</template>
<script>
import footerGuide from '../../components/footer/footerGuide'
import headerGuide from '../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'
import alertTip from '../../components/common/alertTip'
import {getImgPath} from '../../components/common/mixin'

	export default {
		components: {
			footerGuide,
			headerGuide,
			alertTip
		},
		mixins: [getImgPath],
		data() {
			return {
				headerTitle: "购物车",
				selectedIndex: [],
				alertText: null,
				showAlert: false,
				isShowLoginBtn: false
			}
		},
		created() {
			this.init_shopCartDataFromLocal();
			this.INIT_USERINFO_FROMLOCAL();
		},
		computed: {
			/*监听cartList的变化*/
			...mapState ([
				'cartList', 'userInfo'
			]),
			goodsList: function() {
				let tmpGoodsList = [];
				let cart = this.cartList;
                if(typeof cart == 'object') {
                    let keys = Object.keys(cart);
                    keys.forEach((key, index) => {
                        let goods = cart[key];
                        goods['cGoodsNo'] = key;
                        tmpGoodsList.push(goods);
                    });
                    return tmpGoodsList;
                } else {
                    return null;
                };
			},
			isEmpty: function() {
				if (this.goodsList.length == 0) {
					return true;
				} else {
					return false;
				}
			},
			totalPrice: function() {
				if (this.selectedIndex.length == 0) {
					return 0;
				} else {
					var total = 0;
					this.selectedIndex.map((indexValue) => {
						let goodsCount = parseInt(this.goodsList[indexValue].goodsCount);
						let goodsPrice = parseFloat(this.goodsList[indexValue].bOnLine_Price);
						total += goodsCount * goodsPrice;
					})
					return total;
				}
			},
			isSelectedAll: function() {
				return this.selectedIndex.length == this.goodsList.length;
			}
		},
		watch: {
			selectedIndex: function() {
				console.log(this.selectedIndex);
			}
		},
		methods: {
			...mapMutations([
				'ADD_CART', 'REDUCE_CART', 'INIT_SHOPCART', 'SET_SELECTED_CARTGOODS','SET_ORDER_FREIGHT', 'SET_ORDER_PAYWAYS', 'SET_ORDER_DEFAULTADDRESS', 'SET_ORDER_DEFAULT_STOREADDRESS', 'MODIFY_HOMEINDEX', 'INIT_USERINFO_FROMLOCAL'
			]),
			get_shopCartData(params) {
				if (!params) {
					params = {}
				} 
				this.$api.post('/Simple_online/Select_Shop_cart', params, result => {
					if (result.resultStatus === '1') {						
						this.goodsList = result.dDate;
					}
				});
			},
			init_shopCartDataFromLocal() {
				this.INIT_SHOPCART();
				let cart = this.cartList;
                if(typeof cart == 'object') {
                    this.init_selectedIndex();
                }
			},
			init_selectedIndex() {
				this.selectedIndex = this.goodsList.map((element, index) => {
					this.$set(element, 'isSelected', true);
					this.$set(element, 'row', index);
					return index;
				})
			},
			decrease_goods(goods, index) {
				console.log("decrease goodsIndex: " + index);
				let cGoodsNo = goods.cGoodsNo;
				if (goods.goodsCount == 1) {
					this.selectedIndex = this.selectedIndex.filter((element) => {
						return element != index;
					}).map((element) => {
						if (element > index) {
							element--
						}
						return element;
					})
				 }
				this.REDUCE_CART({cGoodsNo: cGoodsNo});
			},
			increase_goods(goods) {
				var count = parseInt(goods.Num);
				count += 1;
				goods.Num = String(count);
				let cGoodsImagePath = goods.cGoodsImagePath;
				let RowNumber 		= goods.RowNumber;
				let Show_Level 		= goods.Show_Level;
				let bFresh 			= goods.bFresh;
				let bOnLine_Price 	= goods.bOnLine_Price;
				let cGoodsName 		= goods.cGoodsName;
				let cSpec			= goods.cSpec;
				let cUnit			= goods.cUnit;
				let fNormalPrice	= goods.fNormalPrice;
				let fVipPrice		= goods.fVipPrice; 
				let Last_Price 		= goods.Last_Price
				this.ADD_CART({cGoodsNo:goods.cGoodsNo, cGoodsImagePath, RowNumber, Show_Level, bFresh, bOnLine_Price, cGoodsName, cSpec, cUnit, fNormalPrice, fVipPrice});
			},
			reverseGoodsState(goods) {
				goods.isSelected = !goods.isSelected;
				let row = goods.row;
				if (goods.isSelected) {
					if (!this.selectedIndex.includes(row)) {
						this.selectedIndex.push(row);
					}
				} else {
					if (this.selectedIndex.includes(row)) {
						let tmpSelectedIndex = []; 
						this.selectedIndex.map((value) => {
							if (value !== row) {
								tmpSelectedIndex.push(value);
							}
						});
						this.selectedIndex = tmpSelectedIndex;
					}
				}
				
			},
			isSelectedAllClick() {
				if (this.isSelectedAll) {
					this.selectedIndex = [];
					this.goodsList.map((element) => {
						element.isSelected = false;
					});
				} else {
					this.init_selectedIndex();
				}
			},
			settmentDidClick() {
				/*
				*	1. 判断用户是否登录
					2. 获取运费/地址
					3. 获取被选中的购买商品
					4. 跳转页面
				*/
				if (!this.userInfo.UserNo) {
					this.showAlert = true;
					this.alertText = "请先登录";
					this.isShowLoginBtn = true
					return
				}

				if (this.selectedIndex.length == 0) {
					this.showAlert = true
					this.alertText = "购物车不能为空"
					return
				}

				let selectedcGoodsNo = this.selectedIndex.map((value) => {
					return this.goodsList[value].cGoodsNo
				});
				this.SET_SELECTED_CARTGOODS({selectedcGoodsNo:selectedcGoodsNo});
				this.$api.post('/Simple_online/Address_PayWay_SendMoney', {"Money":this.totalPrice, "cStoreNo":this.userInfo.cStoreNo, "UserNo":this.userInfo.UserNo}, result => {
					if (result.resultStatus === '1') {
						this.SET_ORDER_FREIGHT({freight: result.freight});
						if (result.array1.length > 0) {
							this.SET_ORDER_DEFAULTADDRESS({defaultOrderAddress: result.array1[0]});
						}
						this.SET_ORDER_PAYWAYS({payways: result.array2});
						if (result.array3.length > 0) {
							this.SET_ORDER_DEFAULT_STOREADDRESS({defaultOrderStoreAddress: result.array3[0]});
						}
						this.$router.push('/orderSettlement');
					}
				});
				
			},
			toShopping() {
				this.MODIFY_HOMEINDEX({selectedIndex:1});
				this.$router.push('/category');
			},
			login() {
				this.$router.push('/login');
			}
		}
	};
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
	.shopCartWrapper {
		padding-top: $headerGuideH;
		padding-bottom: $footerGuideH;
		.shopCart-box {
			.shopCart-list{
				width: 100%;
				ul {
					li {
						position: relative;
						display: flex;
						padding: 10px 0 10px 0px;
						background: #fff;
						.checkboxWrapper {
							position: relative;
							display: inline-block;
							width: 30px;
							height: initial;
							span {
								@include center;
								i {
									font-size: .85rem;
									color: rgba(7, 17, 27, .2);
								}
							}
							.selectedGoods {
								i {
									color: $appMainColor;
								}
							}
						}
						.contentWrapper {
							position: relative;
							display: inline-block;
							flex: 1;
							.iconWrapper {
								display: inline-block;
								width: 50px;
								height: 50px;
								vertical-align: top;
								img {
									width: 100%;
									height: 100%;
									@include borderRadius(4px);
								}
							}
							.goodsInfoWrapper {
								display: inline-block;
								flex: 1;
								height: 100%;
								h2{
									white-space: nowrap;
									text-overflow: ellipsis; 
									font-size: 14px;
								}
								p {
									font-size: 14px;
									color: rgb(243, 12, 12);
								}
							}
							.decrIncrWrapper {
								position: absolute;
								right: 10px;
								bottom: 0px;
								height: 30px;
								width: 100px;
								.baseWrapper {
									display: flex;
									width: 100%;
									height: 100%;
									span {
										display: inline-block;
										width: 30px;
										height: 30px;
										text-align: center;
										line-height: 30px;
									}
									.decrease {
										i {
											color: $blue;
											font-size: 1.2rem;
										}
									}
									.increase {
										i {
											color: $blue;
											font-size: 1.2rem;
										}
									}
									.counts {
										font-size: 16px;
										color: rgb(7, 17, 27);
									}
								}
							}
						}
						.bottom-line {
							position: absolute;
							bottom: 0px;
							left: 0px;
							width: 100%;
							height: 1px;
							background-color: rgba(7, 17, 27, 0.1);
						}
					}
				}
			}
			.settmentWrapper {
				position: fixed;
				display: flex;
				bottom: $footerGuideH;
				left: 0px;
				width: 100%;
				height: 1.95rem;
				background-color: white;
				box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
				.leftWrapper {
					position: relative;
					flex: 1;
					height: 100%;
					display: inline-block;
					.checkboxWrapper {
						position: relative;
						display: inline-block;
						width: 30px;
						height: 1.95rem;
						span {
							@include center;
							i {

								color: rgba(7, 17, 27, .2);
							}
						}
						.isSelectedAll {
							i {
								color: $appMainColor;
							}
						}
					}
					.contentWrapper {
						display: inline-block;
						height: 100%;
						vertical-align: top;
						.totalPrice {
							display: block;
							height: 100%;
							width: 100%;
							line-height: 1.95rem;
							font-size: 0.6rem;
						}
					}
				}
				.rightWrapper {
					position: relative;
					width: 100px;
					height: 100%;
					display: inline-block;
					background-color: rgba(247, 12, 12, 0.9);
					//background-color: rgba(43, 51, 59, 0.6);
					p {
						@include center;
						font-size: 18px;
						width: 100px;
						text-align: center;
						//color: rgba(247, 217, 227, 0.3);
						color: #fff;
					}
				}
			}
		}
		.emptyShopCart-box {
			width: 100%;
			// background-color: white;
			.emptyWrapper {
				.emptyGirlWrapper {
					margin-top: 30%;
					margin-left: 50%;
					transform: translate(-50%, 0);
					width: 8rem;
					height: 9rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
				.title {
					text-align: center;
					font-size: .6rem;
					span {
						color: rgba(7, 17, 27, .3);
					}
				}
				.shop-button {
					margin-top: 2rem;
					text-align: center;
					span {
						display: inline-block;
						width: 30%;
						height: 1.5rem;
						line-height: 1.5rem;
						color: white;
						background-color: $appMainColor;
						@include borderRadius(.1rem);
						font-size: .75rem;
					}
				}
			}
		}
	}
</style>










