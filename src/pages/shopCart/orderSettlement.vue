<template>
	<div class="orderSettlementWrapper">
		<headerGuide :title = "headerTitle" :isShowBack = 'true'>
			
		</headerGuide>
		<div class="contentBox">
			<div class="contentWrapper">
				<ul class="order-list">
					<li class="order-settlement-item" @click="gotoAddress('/chooseServiceStore')">
						<div class="title"><span class="title-text">选择服务门店</span></div>
						<div class="content addressWrapper">
							<div class="icon">
								<span class="icon-text">
									<i class="dandan-map address-icon-text"></i>
								</span>
							</div>
							<div class="storeWrapper">
								<div class="stroeInfoWrapper">
									<div class="store">
										<span class="storename ellipsis">{{serviceStore.cStoreName}}</span>
										<span class="tel ellipsis">{{serviceStore.Tel}}</span>
									</div>
									<div class="detailAddress">
										<span class="ellipsis">{{serviceStore.Address}}</span>
									</div>
								</div>
							</div>
							<div class="more">
								<span class="more-text">
									<i class="dandan-- list-icon-text"></i>
								</span>
							</div>
						</div>
					</li>
					<li class="order-settlement-item">
						<div class="title"><span class="title-text">选择配送方式</span></div>
						<div class="content">
							<ul class="transport-list">
								<li class="transport-item" v-for= 'transportWay in transportWays' @touchstart = 'chooseTransportway(transportWay)'>
									<span class="transport-text">{{transportWay.title}}</span>
									<span class="selected-icon" :class = "{'selectedTransportWay': transportWay.type == computedTransportWay}">
										<i class="dandan-uniE900"></i>
									</span>
								</li>
								<!-- <li class="transport-item">
									<span class="transport-text">送货上门</span><span class="selected-icon"><i class="dandan-uniE900"></i></span>
								</li> -->
							</ul>
						</div>
					</li>
					<li class="order-settlement-item" v-if="computedTransportWay == 1" @click="gotoAddress('/chooseAddress')">
						<div class="title"><span class="title-text">配送地址</span></div>
						<div class="content addressWrapper">
							<div class="icon">
								<span class="icon-text">
									<i class="dandan-uniE914 address-icon-text"></i>
								</span>
							</div>
							<div class="storeWrapper">
								<div class="stroeInfoWrapper">
									<div class="store">
										<span class="storename ellipsis">{{userAddress.UserName}}</span>
										<span class="tel ellipsis">{{userAddress.Tel}}</span>
									</div>
									<div class="detailAddress">
										<span class="ellipsis">{{userAddress.totalAdressInfo!=null?userAddress.totalAdressInfo:userAddress.Detailaddress}}</span>
									</div>
								</div>
							</div>
							<div class="more">
								<span class="more-text">
									<i class="dandan-- list-icon-text"></i>
								</span>
							</div>
						</div>
					</li>
					<li class="order-settlement-item">
						<div class="title"><span class="title-text">选择配送时间段</span></div>
						<div class="content">
							<div class="transport-timeWrapper">
								<span class="time-icon">
									<i class="dandan-uniE916 list-icon-text"></i>
								</span>
								<span class="date">{{tomorrow}}</span>
								<span class="time">09:00-09:30</span>
								<span class="more">
									<i class="dandan-- list-icon-text"></i>
								</span>
							</div>
						</div>
					</li>
					<li class="order-settlement-item">
						<div class="title"><span class="title-text">订单商品详情</span></div>
						<div class="content">
							<goodList :goodsList = 'goodsList' :showRealGoodsNum = 'false'></goodList>
						</div>
					</li>
					<li class="order-settlement-item">
						<div class="title"><span class="title-text">购买备注</span></div>
						<div class="content">
							<div class="remarksWrapper">
								<span class="remarks-title">备注</span><input type="text" name="remarks" class="remarks-input" v-model="remarks"/>
							</div>
						</div>
					</li>
					<li class="order-settlement-item">
						<div class="title"><span class="title-text">支付详情</span></div>
						<div class="content">
							<ul class="pay-list">
								<li class="pay-item">
									<span class="title-item">商品总额</span><span class="money">{{totalGoodsMoney}}元</span>
								</li>
								<li class="pay-item">
									<span class="title-item">配送费</span><span class="money">+{{parseFloat(freight)
									}}元</span>
								</li>
								<li class="pay-item">
									<span class="title-item">优惠金额</span><span class="money">-{{discount}}元</span>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</div>
			<div class="confirmWrapper">
				<div class="infoWrapper">
					<span class="title">合计&nbsp;</span>
					<span class="confirmInfo">¥&nbsp;{{(parseFloat(totalMoney)).toFixed(2)}}元</span>
				</div>
				<div class="confirmBtnWrapper" @touchstart="goto('/orderPay')">
					<span class="title">确认</span>
				</div>
			</div>
		</div>
		<alertTip v-if="showAlert" :alertText = "alertText" @closeTip="showAlert=false"></alertTip>
		<div class="emptyWrapper" v-if='false'>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../components/header/headerGuide'
import goodList from '../../components/common/goodsList'
import {mapState, mapMutations} from 'vuex'
import alertTip from '../../components/common/alertTip'
import {getToday, getTomorrow} from '../../config/Tool'

export default {
	components: {
		headerGuide,
		goodList,
		alertTip,
	},
	data() {
		return {
			headerTitle: "订单确认",
			goodsList:[],
			/* 0--- 自提 1-- 送货上门 */
			transportWays: [{type: 0, title:'自提'}, {type: 1, title: '送货上门'}],
			/* 订单号 */ 
			orderSheetNo: null,
			/* 备注 */ 
			remarks: null,
			showAlert: false,
			alertText: null,
			today: getToday("yyyy-MM-dd"),
			tomorrow: getTomorrow("yyyy-MM-dd")
		}
	},
	computed: {
		...mapState([
			'selectedCartList', 'freight', 'currentServiceStore', 'currentUserAddress','selectedTransportWay', 'defaultOrderAddress', 'defaultOrderStoreAddress', 'userInfo'
		]),
		totalGoodsMoney: function() {
			if (this.selectedCartList) {
				let tmpTotalGoodsMoney = 0;
				let goodsListKeys = Object.keys(this.selectedCartList);
				goodsListKeys.map(key => {
					let goods = this.selectedCartList[key];
					tmpTotalGoodsMoney += parseFloat(goods.goodsCount) * parseFloat(goods.bOnLine_Price);
				});
				return tmpTotalGoodsMoney;
			}
		},
		discount: function() {
			return 0;
		},
		totalMoney: function() {
			if (this.totalGoodsMoney && this.freight) {
				return this.totalGoodsMoney + parseFloat(this.freight) - this.discount;
			} else {
				return 0;
			}
		},
		serviceStore: function() {
			if (this.currentServiceStore.cStoreNo) {
				return this.currentServiceStore;
			} 
			else if (this.defaultOrderStoreAddress.cStoreNo) {
				return this.defaultOrderStoreAddress;
			} 
			else {
				return {}
			}
			
		},
		userAddress: function() {
			if (this.currentUserAddress.AddressID) {
				return this.currentUserAddress;
			}
			else if (this.defaultOrderAddress.AddressID) {
				return this.defaultOrderAddress;
			} else {
				return {};
			}	
		},
		computedTransportWay: function() {
			return this.selectedTransportWay;
		}
	},
	created() {
		this.get_orderGoodsList();
	},
	methods: {
		...mapMutations([
			'SET_ORDER_TOTALMONEY', 'MODIFY_TRANSPORTWAY','REMOVE_CART', 'SET_SELECTED_CARTGOODS',
			]),
		get_orderGoodsList() {
			let goodsListKeys = Object.keys(this.selectedCartList);
			goodsListKeys.map(key => {
				let goods = this.selectedCartList[key];
				this.goodsList.push(goods);
			})

			console.log("defaultOrderAddress", this.defaultOrderAddress);
			console.log("currentUserAddress", this.currentUserAddress)
		},
		goto(path) {
			/* 1. 用户是否选择服务门店 2. 用户是否选择地址 3. 用户是否选择配送时间段 */ 
			if (!this.serviceStore.cStoreNo) {
				this.showAlert = true;
				this.alertText = "请选择服务门店";
				return
			}

			if (this.computedTransportWay == 1) {
				if (!this.userAddress.AddressID) {
					this.showAlert = true;
					this.alertText = "请选择用户服务地址";
					return
				}
			}
			
			//做一些安全性的检查
			this.SET_ORDER_TOTALMONEY({"orderTotalMoney":this.totalMoney});
			let keyList = Object.keys(this.selectedCartList);
			let orderGoodsList = keyList.map((key) => {
				let goods = this.selectedCartList[key];
				let orderGoods = null;
				if (goods.goodsCount) {
					let lastMoney = goods.goodsCount * parseFloat(goods.bOnLine_Price);
					orderGoods = {
						"Num": goods.goodsCount,
						"Last_Price": goods.bOnLine_Price,
						"RowNumber": goods.RowNumber,
						"cGoodsImagePath": goods.cGoodsImagePath,
						"cGoodsName": goods.cGoodsName,
						"cGoodsNo": goods.cGoodsNo,
						"Last_Money": lastMoney
					};
					return orderGoods;
				}
			});
			let content = JSON.stringify(orderGoodsList);
			let start_time = this.tomorrow + " 09:00";
			let end_time   = this.tomorrow + " 11:00";

			let params  = {"UserNo":this.userInfo.UserNo, "AddressID": "109", "Notes":this.remarks, "dData":content, "Freight":this.freight,"cStoreNo":this.userInfo.cStoreNo, "Send_Way":this.computedTransportWay.toString(),"Cover_Fresh":"1","Start_time":start_time,"End_time":end_time,"Send_cStoreNo":this.serviceStore.cStoreNo};
			console.log("params", params);
			
			this.$api.post('/Simple_online/Upload_order', params, result =>{
				if (result.resultStatus == '1') {
					this.orderSheetNo = result.dDate;
					this.clearSelectedGoods();
					this.$router.push(path+"/"+this.orderSheetNo);
				}
			});
			
		},
		/*
		* 从本地删除商品
		*/
		clearSelectedGoods() {
			console.log("selectedCartList--------",this.selectedCartList);
			let keys = Object.keys(this.selectedCartList);
			keys.map((cGoodsNo) => {
				this.REMOVE_CART({removedcGoodsNo:cGoodsNo});
			});
			this.SET_SELECTED_CARTGOODS({selectedcGoodsNo:null});
		},
		chooseTransportway(transportWay) {
			if (transportWay) {
				this.MODIFY_TRANSPORTWAY({selectedWay: transportWay.type});
			}
		},
		gotoAddress(path) {
			if (path) {
				this.$router.push(path);
			}
		}
	}
}

</script>

<style lang='scss' scoped>
@import '../../style/mixin';
$addressHeight: 4rem;

	.orderSettlementWrapper {
		padding-top: 1.95rem;
		padding-bottom: 2.2rem;
		.contentWrapper {
			.order-list {
				.order-settlement-item {
					margin-bottom: .6rem;
					background-color: white;
					.title {
						@include border1px(rgba(7, 17, 27, .1));
						font-size: .8rem;
						.title-text {
							display: inline-block;
							margin: .2rem .5rem;
						}
					}
					.content {
						// display: flex;
						.transport-list {
							width: 100%;
							.transport-item {
								display: flex;
								padding-left: 2rem;
								width: 100%;
								height: 1.5rem;
								font-size: .7rem;
								.transport-text {
									display: inline-block;
									flex: 4;
									height: 1.5rem;
									line-height: 1.5rem;
								}
								.selected-icon {
									display: inline-block;
									flex: 1;
									width: 2rem;
									height: 1.5rem;
									line-height: 1.5rem;
									text-align: center;
									i {
										display: inline-block;
										height: 1.5rem;
										line-height: 1.5rem;
										font-size: 0.9rem;
										color: rgba(7, 17, 27, .3);
									}
								}
								.selectedTransportWay {
									i {
										color: $appMainColor;
									}
								}
							}
						}
						.pay-list {
							width: 100%; 
							.pay-item {
								display: flex;
								padding-left: 2rem;
								width: 100%;
								height: 1.2rem;
								font-size: .7rem;
								.title-item {
									display: inline-block;
									flex: 3;
									height: 1.2rem;
									line-height: 1.2rem;
								}
								.money {
									display: inline-block;
									flex: 4;
									width: 2rem;
									height: 1.2rem;
									line-height: 1.2rem;
									text-align: center;
								}
							}
						}
						.remarksWrapper {
							display: flex;
							height: 1.5rem;
							font-size: .7rem;
							padding-left: 1.2rem;
							.remarks-title {
								flex: 1;
								display: inline-block;
								text-align: center;
								height: 1.5rem;
								line-height: 1.5rem;
							}
							.remarks-input {
								flex: 8;
								display: inline-block;
								height: 1.5rem;
								padding-left: .5rem;
								line-height: 1.5rem;
							}
						}
						.transport-timeWrapper {
							display: flex;
							height: 1.8rem;
							font-size: .7rem;
							text-align: center;
							.time-icon {
								flex: 3;
								display: inline-block;
								height: 1.8rem;
								line-height: 1.8rem;
								position: relative;
								i {
									display: inline-block;
									@include center;
									font-size: 1.5rem;
									color: $appMainColor;
								}
							}
							.date {
								flex: 6;
								display: inline-block;
								height: 1.8rem;
								line-height: 1.8rem;
							}
							.time {
								flex: 6;
								display: inline-block;
								height: 1.8rem;
								line-height: 1.8rem;
							}
							.more {
								flex: 2;
								display: inline-block;
								height: 1.8rem;
								line-height: 1.8rem;
							}
						}
					}
					.addressWrapper {
						width: 100%;
						display: flex;
						height: $addressHeight;
						.icon {
							width: 2rem;
							flex-shrink: 0;
							.icon-text {
								display: inline-block;
								width: 100%;
								height: $addressHeight;
								line-height: $addressHeight;
								text-align: center;
							}
						}
						.storeWrapper {
							flex: 12;
							display: flex;
							// width: 11rem;
							.stroeInfoWrapper {
								display: flex;
								width: 12rem;
								display-wrap: nowrap;
								flex-direction: column;
								height: $addressHeight;
								.store {
										display: flex;
										flex: 1;
										flex-direction: row;
										padding: 0 .5rem;
										font-size: .8rem;
										.storename {
											text-align: left;
											width: 50%;
											height: 100%;
											white-space:nowrap;
											font-size: .72rem;
											line-height: $addressHeight/2;
											font-weight: bold;
										}
										.tel {
											// flex: 1;
											text-align: center;
											width: 50%;
											font-size: .66rem;
											white-space:nowrap;
											height: 100%;
											line-height: $addressHeight/2;
										}
									}
									.detailAddress {
										padding: 0 .5rem;
										font-size: .7rem;
										flex: 1;
										span {
											display: inline-block;
											height: 100%;
											width: 12rem;
											line-height: $addressHeight/2;
											font-size: .72rem;
										}
								}
							}
						}
						.more {
							flex: 2;
							flex-shrink: 0;
							.more-text {
								display: inline-block;
								width: 100%;
								height: $addressHeight;
								line-height: $addressHeight;
								text-align: center;
							}
						}
					}
				}
			}
		}
		.confirmWrapper {
			position: fixed;
			display: flex;
			bottom: 0px;
			left: 0px;
			height: 2.2rem;
			width: 100%;
			background-color: white;
			text-align: center;
			box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
			.infoWrapper{
				flex: 5;
				font-size: .9rem;
				padding-left: .3rem;
				text-align: left;
				.title {
					display: inline-block;
					vertical-align: top;
					height: 2.2rem;
					line-height: 2.2rem;
					font-size: .6rem;
				}
				.confirmInfo {
					display: inline-block;
					height: 2.2rem;
					line-height: 2.2rem;
					color: rgba(224, 128, 49, 1);
					font-size: .85rem;
				}
			}
			.confirmBtnWrapper {
				flex: 5;
				background-color: rgba(224, 128, 49, 1);
				.title {
					font: 1rem;
					display: inline-block;
					height: 2.2rem;
					line-height: 2.2rem;
					color: white;
				}
			}
		}
	}
	.dandan-- {
		color: rgba(7, 17, 27, .4)!important;
	}
	.address-icon-text {
		color: $appMainColor;
		font-size: 1.2rem;
	}
</style>

