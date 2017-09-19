<template>
	<div class="profileWrapper">
		<!-- :rightData="{'title':'登录/注册', 'path':'/login'} -->
		<headerGuide :title = "headerTitle"></headerGuide>
		<div class="contentWrapper">
			<div class="userInfoWrapper profileItem">
				<div class="iconWrapper">
					<img src="/static/avatar_timg.jpeg" />
				</div>
				<div class="userNameWrapper" @click="didClickHeader()">
					<div class="leftWrapper">
						<span class="userName">{{userName}}</span>
						<span class="userPhone">
							<span class="phone-icon">
								<i class="dandan-uniE903"></i>
							</span>
							<span class="phone-text">{{userPhone}}</span>
						</span>
					</div>
					<div class="rightWrapper">
						<span class="arrow-more">
							<i class="dandan--"></i>
						</span>
					</div>
				</div>
			</div>
			<div class="orderWrapper profileItem">
				<div class="titleWrapper" @touchstart='checkAllOrders()'>
					<span class="title">我的订单</span>
					<span class="more">查看全部订单</span>
				</div>
				<div class="orderTypeWrapper">
				<!--0 待付款/ 1 待发货/ 2 待取货 /3 待收货 /4 已完成-->
					<ul class="order-item-wrapper">
						<li class="order-item" @click="gotoOrderPage('/allOrders', 0)">
							<span class="order-icon" id="unpay">
								<i class="dandan-uniE90C order-icon-text"></i>
							</span>
							<span class="order-title">待付款</span>
						</li>
						<li class="order-item" @click="gotoOrderPage('/unpost', 1)">
							<span class="order-icon" id="unpost">
								<i class="dandan-uniE90D order-icon-text"></i>
							</span>
							<span class="order-title">待发货</span>
						</li>
						<li class="order-item" @click="gotoOrderPage('/unget', 2)">
							<span class="order-icon" id="unget">
								<i class="dandan-uniE90E order-icon-text"></i>
							</span>
							<span class="order-title">待取货</span>
						</li>
						<li class="order-item" @click="gotoOrderPage('/unreceive', 3)">
							<span class="order-icon" id="unreceive">
								<i class="dandan-uniE910 order-icon-text"></i>
							</span>
							<span class="order-title">待收货</span>
						</li>
						<li class="order-item" @click="gotoOrderPage('/completed', 4)">
							<span class="order-icon" id="completed">
								<i class="dandan-uniE90F order-icon-text"></i>
							</span>
							<span class="order-title">已完成</span>
						</li>

					</ul>
				</div>
			</div>
			<div class="vipCardWrapper profileItem">
				<div class="titleWrapper">
					<span class="title">我的会员卡</span>
				</div>
				<div class="contentWrapper">
					<ul class="vipCardList">
						<li class="vipCard-item" @click="gotoAddress('/wallet')">
							<span class="icon" id="wallet">
								<i class="dandan-uniE917 list-icon-text" :style="{color: randomColor()}"></i>
							</span>
							<span class="label">我的钱包</span>
							<span class="more-icon">
								<i class="dandan-- more-icon-text"></i>
							</span>
						</li>
						<li>
							<span class="icon" id="integration">
								<i class="dandan-uniE91C list-icon-text small-list-icon" :style="{color: randomColor()}"></i>
							</span>
							<span class="label">会员积分</span>
							<span class="more-icon">
								<i class="dandan-- more-icon-text"></i>
							</span>
						</li>
					</ul>
					<div class="vipCard-chargeWrapper">
						<p>充值最高可得3倍积分</p>
						<div class="chargeContent">
							<ul class="vipChargeList">
								<li></li>
							</ul>
						</div>
						<div class="chargebtn"><span>立即充值</span></div>
					</div>
				</div>
			</div>
			<div class="functionsWrapper profileItem">
				<ul>
					<li @touchstart="gotoAddress('/address')">
						<span class="icon" id="address">
							<i class="dandan-uniE914 list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">收货地址管理</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li>
					<li @click="gotoAddress('/modifyPayword')">
						<span class="icon" id="modify-password">
							<i class="dandan-uniE904 list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">修改支付密码</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li>
					<!-- <li>
						<span class="icon" id="upgrade">
							<i class="dandan-upgrade list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">如何升级</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li> -->
					<li @click="gotoAddress('/editUserInfo')"> 
						<span class="icon" id="settings">
							<i class="dandan-uniE912 list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">设置</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li>
					<li @click="gotoAddress('/feedback')">
						<span class="icon" id="feedback">
							<i class="dandan-uniE905 list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">意见反馈</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li>
					<li @click = "logout()">
						<span class="icon" id="logout">
							<i class="dandan-logout list-icon-text" :style="{color: randomColor()}"></i>
						</span>
						<span class="label">退出登录</span>
						<span class="more-icon">
							<i class="dandan-- more-icon-text"></i>
						</span>
					</li>
				</ul>
			</div>
		</div>
		<alertTip v-if="showAlert" @closeTip="closeTip" :alertText="alertText" :isShowLoginBtn = "isShowLoginBtn" @login="login" :isShowCancel="isShowCancel" @cancel = "cancel" :isModifyConfirm = "isModifyConfirm" @confirm ="confirm"></alertTip>
		<footerGuide></footerGuide>
	</div>
	
</template>

<script>
import footerGuide from '../../components/footer/footerGuide'
import headerGuide from '../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'
import alertTip from '../../components/common/alertTip'
import {
	removeStore
} from '../../config/mUtils'

var seedNum = 0;

	export default {
		components: {
			footerGuide,
			headerGuide,
			alertTip
		},
		data() {
			return {
				headerTitle: "我的",
				colorLibs: ['#FFD700','#F6AD45','#F0714E','#DC143C','#81B81B','#EF865E','#59A8ED','#CD853F'],
				showAlert: false,
				alertText: null,
				isShowLoginBtn: false,
				isShowCancel: false,
				isModifyConfirm: false
			}
		},
		created() {
			// this.addListenterForClick();
			this.INIT_USERINFO_FROMLOCAL();
		},
		mounted() {

		},
		computed: {
			...mapState([
				'userInfo'
				]),
			userName: function() {
				if (this.userInfo.UserNo) {
					return this.userInfo.UserNo;
				} else {
					return "登录/注册";
				}
			},
			userPhone: function() {
				if (this.userInfo.Tel) {
					return this.userInfo.Tel;
				} else {
					return "登录后享受更多特权"
				}
			}
		}, 
		methods: {
			...mapMutations([
				'INIT_USERINFO_FROMLOCAL', 'MODIFY_ORDER_SELECTEDTYPEINDEX'
				]),
			checkAllOrders() {
				if (this.isUserLogin()) {
					this.$router.push('/allOrders');
				}
			},
			gotoAddress(path) {
				if(this.isUserLogin()){
					if (path) {
						this.$router.push(path);
					}
				} 
			},

			/* <!--0 待付款/ 1 待发货/ 2 待取货 /3 待收货 /4 已完成--> */
			gotoOrderPage(path, index) {
				if (this.isUserLogin()) {
					this.MODIFY_ORDER_SELECTEDTYPEINDEX({selectedOrderTypeIndex: index});
					this.$router.push(path);
				}
			},
			/*随机数选择颜色*/
			randomColor() {
				let randomNum = seedNum;
				let color = this.colorLibs[randomNum % this.colorLibs.length];
				seedNum++;
				return color;
			},
			didClickHeader() {
				if (this.userInfo.UserNo) {
					this.$router.push('/editUserInfo');
				} else {
					this.$router.push('/login');
				}
			},
			isUserLogin() {
				if (this.userInfo.UserNo == null) {
					this.showAlert = true;
					this.isShowLoginBtn = true;
					this.alertText = "您还未登录."
					return false;
				} else {
					return true;
				}
			},
			logout() {
				if (this.isUserLogin()) {
					this.showAlert = true;
					this.isShowCancel = true;
					this.isModifyConfirm = true;
					this.alertText = '是否确定退出登录';
				}
			},
			login() {
				this.$router.push('/login');
			},
			closeTip() {
				this.showAlert = false;
			},
			confirm() {
				removeStore('userInfo');
				this.INIT_USERINFO_FROMLOCAL();
				this.showAlert = false;
				this.isShowCancel = false;
				this.isModifyConfirm = false;
			},
			cancel() {
				this.showAlert = false;
			}
		}
	};
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
.profileWrapper {
	padding-top: $headerGuideH;
	padding-bottom: $footerGuideH;
	.contentWrapper {
		.profileItem {
			margin: 0 0 0 0;
			background-color: #fff;
		}
		.userInfoWrapper {
			background-color: $appMainColor;
			display: flex;
			padding: .6rem;
			.iconWrapper {
				width: 3rem;
				text-align: center;
				img {
					width: 3rem;
					height: 3rem;
					@include borderRadius(1.5rem);
				}
			}
			.userNameWrapper {
				display: flex;
				flex: 1;
				.leftWrapper {
					flex: 1;
					padding: .3rem .5rem;
					.userName {
						display: block;
						color: white;
						font-size: .8rem;
						padding-bottom: .1rem;
						font-weight: bold;
					}
					.userPhone {
						display: block;
						height: 1.2rem;
						color: white;
						font-size: .6rem;
						.phone-icon {
							i {
								color: white;
								font-size: 1.2rem;
							}
						}
						.phone-text {
							display: inline-block;
							line-height: 1.2rem;
							height: 1.2rem;
							vertical-align: top;
							color: white;
							font-weight: bold;
						}
					}
				}
				.rightWrapper {
					width: 1rem;
					.arrow-more {
						display: inline-block;
						height: 3rem;
						line-height: 3rem;
						i {
							font-size: 1rem;
							color: white;
						}
					}
				}
				
			}
		}
		//订单样式
		.orderWrapper {
			.titleWrapper {
				display: flex;
				padding: .3rem;
				@include border1px(rgba(7, 17, 27, 0.1));
				span {
					font-size: .7rem;
				}
				.title {
					flex: 2;
				}
				.more {
					flex: 1;
					text-align: right;
					font-size: .7rem;
					color: $appMainColor;
				}

			}
			.orderTypeWrapper {
				.order-item-wrapper {
					display: flex;
					.order-item {
						padding: .1rem;
						display: inline-block;
						flex: 1;
						font-size: .6rem;
						text-align: center;
						.order-icon {
							display: block;
							width: 100%;
							height: 2rem;
							background-repeat: no-repeat;
							background-size: 60%, 60%;
							background-position: center;
							.order-icon-text {
								display: inline-block;
								margin-top: .25rem;
								font-size: 1.5rem;
							}
						}
						.order-title {
							color: rgb(7, 17, 27);
						}
					}
				}
			}
		}

		//会员卡样式
		.vipCardWrapper {

			.titleWrapper {
				padding: .3rem;
				display: flex;
				@include border1px(rgba(7, 17, 27, 0.1));
				.title {
					flex: 1;
					font-size: 18px;
				}
			}
			.contentWrapper {
				@include border1px(rgba(7, 17, 27, 0.1));

				.vipCardList {
					@include border1px(rgba(7, 17, 27, 0.1));
					li {
						padding: .2rem;
						margin-left: .5rem;
						@include border1px(rgba(7, 17, 27, 0.1));
						font-size: 16px;
						display: flex;
						.icon {
							width: 1.5rem;
							height: 1.5rem;
							position: relative;
							i {
								display: inline-block;
								font-size: 1.2rem;
								// color: $appMainColor;
								@include center;
							}
							.small-list-icon {
								font-size: 1.5rem;
							}
						}
						#wallet {
							
						}
						#integration {
							
						}
						.label {
							flex: 1;
							height: 1.5rem;
							line-height: 1.5rem;
							padding-left: .4rem;
						}
						.more-icon {
							width: 1.5rem;
							height: 1.5rem;
							position: relative;
							i {
								display: inline-block;
								@include center;
								color: rgba(7, 17, 27, .2);
								font-size: 1rem;
							}
						}
						&:last-child {
							@include border1px(rgba(255, 255, 255, 0));
						}
					}
				}

				//会员卡充值策略样式
				.vipCard-chargeWrapper {
					// background-color: rgba(77,152,232,1);
					p {
						padding: .5rem 0 .5rem 0;
						color: #F0714E;
						font-size: .8rem;
						text-align: center;
					}
					.chargeContent {
						width: 100%;
						height: 5rem;
					}
					.chargebtn {
						width: 100%;
						height: 1.95rem;
						text-align: center;
						background-color: $appMainColor;
						span {
							color: white;
							font-size: .8rem;
							display: inline-block;
							line-height: 1.95rem;
							height: 1.95rem;
						}
					}
				}
			}
		}
		//个人中心, 功能列表样式
		.functionsWrapper {
			@include border1px(rgba(7, 17, 27, 0.1));
			ul {
				li {
					padding: .2rem;
					margin-left: .5rem;
					@include border1px(rgba(7, 17, 27, 0.1));
					font-size: 16px;
					display: flex;
					.icon {
						width: 1.5rem;
						height: 1.5rem;
						background-repeat: no-repeat;
						background-size: 90% 90%;
						background-position: center;
						position: relative;
							i {
								display: inline-block;
								font-size: 1.2rem;
								// color: $appMainColor;
								@include center;
							}
					}
					.label {
						flex: 1;
						height: 1.5rem;
						line-height: 1.5rem;
						padding-left: .4rem;
					}
					.more-icon {
						width: 1.5rem;
						height: 1.5rem;
						position: relative;
						i {
							display: inline-block;
							@include center;
							font-size: 1rem;
							color: rgba(7, 17, 27, .2);
						}
					}
					&:last-child {
						@include border1px(rgba(255, 255, 255, 0));
					}
				}
			}
		}
	}
}
</style>


