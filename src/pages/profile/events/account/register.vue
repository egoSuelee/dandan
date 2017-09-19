<template>
	<div class="registerWrapper">
		<headerGuide :title = 'title' :isShowBack='true'></headerGuide>
		<div class="contentWrapper">
			<div class="register-listWrapper">
				<ul class="register-list">
					<li class="register-item">
						<span class="title">手机号</span>
						<input type="text" name='tel' v-model = "tel"  class="textfield" />
					</li>
					<li class="special-register-item">
						<span class="title">验证码</span>
						<input type="text" name='tel' v-model = "inputVerCode" class="textfield" id="verCode-textfield" />
						<span class="verCode" :class="{'gettingVerCode':isGettingVerCode}" @touchstart="getVerCode()">{{verCodeText}}</span>
					</li>
					<li class="register-item">
						<span class="title">密码</span>
						<input type="password" name='tel' v-model = "password" class="textfield"/>
					</li>
					<li class="register-item">
						<span class="title">确认密码</span>
						<input type="password" name='tel' v-model = "confirmedPassword" class="textfield"/>
					</li>
					<li class="service-store-item" @touchstart="gotoAddress('/chooseServiceStore')">
						<span class="title">服务门店</span>
						<span class="textClick">{{serviceStoreTitle}}&nbsp;&nbsp;&nbsp;</span>
						<span class="more-text">
							<i class="dandan-- list-icon-text"></i>
						</span>
					</li>
				</ul>
			</div>
			<div class="registerBtnWrapper" @click="didClickRegister()">
				<span class="register-text">注册</span>
			</div>
		</div>
		<alertTipAlt v-if="showAlert" :alertText="alertText" @closeTip="closeTip()"></alertTipAlt>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapState} from 'vuex'
import alertTipAlt from '../../../../components/common/alertTipAlt'
import md5 from 'js-md5'
	export default {
		data() {
			return {
				title: '注册',
				tel: null,
				inputVerCode: null,
				password: null,
				confirmedPassword: null,
				isGettingVerCode: false,
				countNum: 60,
				verCode: null,
				alertText: null,
				showAlert: false,
				isSuccess: false
			}
		},
		components: {
			headerGuide,
			alertTipAlt
		},
		computed: {
			...mapState([
				'currentServiceStore'
				]),
			verCodeText: function() {
				if (this.isGettingVerCode) {
					return '请(' + this.countNum +')s后重新获取';
				} else {
					return '获取验证码';
				}
			},
			remainingSeconds: function() {

			},
			serviceStoreTitle: function() {
				if (this.currentServiceStore.cStoreNo) {
					return this.currentServiceStore.cStoreName;
				} else {
					return '点击选择服务门店';
				}
			},
		},
		methods: {
			getVerCode(){
				if (this.isGettingVerCode) {
					return
				} else {
					if (this.tel) {
						this.isGettingVerCode = true;
						this.countRemainingSeconds();
						this.$api.post('/Simple_online/Get_TelPhone_Code', {"Tel":this.tel, "reg_or_update": "0"}, result => {
							console.log(result);
							if (result.resultStatus == '000000') {
								this.verCode = result.dDate;
								console.log(result.dDate);
							}
						});
					} else {
						this.showAlert = true;
						this.alertText = "手机号不能为空"
						return
					}
				}
			},
			didClickRegister() {

				if (!this.tel) {
					this.showAlert = true;
					this.alertText = "手机号不能为空"
					return
				}
				if (!this.inputVerCode) {
					this.showAlert = true
					this.alertText = "验证码不能为空"
					return
				}
				if (this.inputVerCode != this.verCode) {
					this.showAlert = true
					this.alertText = "验证码输入错误"
					return
				}
				if (!this.password) {
					this.showAlert = true
					this.alertText = "密码不能为空"
					return	
				}

				if (this.password != this.confirmedPassword) {
					this.showAlert = true
					this.alertText = "两次输入的密码不一致"
					return
				}
				if (!this.currentServiceStore.cStoreNo) {
					this.showAlert = true
					this.alertText = "请选择您的默认服务门店"
					return
				}

				if (this.tel && this.inputVerCode && this.inputVerCode == this.verCode && this.password && this.password == this.confirmedPassword) {
					this.$api.post('/Simple_online/User_Register', {"Tel": this.tel, "PassWord":md5(this.password), "cStoreNo": this.currentServiceStore.cStoreNo}, result => {
						if (result.resultStatus == '1') {
							this.showAlert = true
							this.alertText = "注册成功"
							this.isSuccess = true
							return
						}
					});	
				}
			},
			countRemainingSeconds() {
				clearInterval(this.timer);
				this.timer = setInterval(() => {
                    this.countNum --;
                    if (this.countNum == 0) {
                        clearInterval(this.timer);
                        [this.countNum, this.isGettingVerCode] = [60, false];
                    }
                }, 1000);
			},
			gotoAddress(path) {
				if (path) {
					this.$router.push(path);
				}
			
			},
			closeTip() {
				if (isSuccess) {
					this.showAlert = false
					this.gotoAddress('/profile');
				} else {
					this.showAlert = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
$registerItemH: 2rem;
	.registerWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			margin-top: 2rem;
			.register-listWrapper {
				width: 100%;
				background: white;
				.register-list {
					margin-bottom: 1rem;
					// @include border1px_top_bottom(rgba(7, 17, 27, 0.3))
					.register-item {
						display: flex;
						width: 100%;
						height: $registerItemH;
						@include border1px(rgba(7, 17, 27, 0.1));
						.title {
							display: inline-block;
							width: 4rem;
							font-size: .72rem;
							height: $registerItemH;
							line-height: $registerItemH;
							text-align: center;
						}
						.textfield {
							display: inline-block;
							flex: 4rem;
							height: $registerItemH;
							padding: .1rem 0;
							font-size: .8rem;
						}
						&:last-child {
							@include border1px(rgba(7, 17, 27, 0.0));
						}
					}
					.special-register-item {
						display: flex;
						width: 100%;
						height: $registerItemH;
						@include border1px(rgba(7, 17, 27, 0.1));
						.title {
							display: inline-block;
							width: 4rem;
							font-size: .72rem;
							height: $registerItemH;
							line-height: $registerItemH;
							text-align: center;
						}
						.textfield {
							display: inline-block;
							width: 5rem;
							height: $registerItemH;
							padding: .1rem 0;
							font-size: .8rem;
						}
						.verCode {
							display: inline-block;
							flex: 1;
							font-size: .72rem;
							height: $registerItemH;
							line-height: $registerItemH;
							text-align: center;
							color: rgba(7, 17, 27, 0.7);
							border-left: 1px solid rgba(7, 17, 27, 0.2);
						}
						.gettingVerCode {
							color: rgba(7, 17, 27, 0.3);
						}
					}
					.service-store-item {
						display: flex;
						width: 100%;
						height: $registerItemH;
						font-size: .72rem;
						
						.title {
							display: inline-block;
							line-height: $registerItemH;
							height: $registerItemH;
							flex: 5;
							text-align: center;
						}
						.textClick {
							display: inline-block;
							line-height: $registerItemH;
							height: $registerItemH;
							flex: 8;
							color: rgba(7, 17, 27, .4);
							text-align: right;
							
						}
						.more-text {
							display: inline-block;
							line-height: $registerItemH;
							height: $registerItemH;
							flex: 3;
							i {
								font-size: $registerItemH;
								transform: scale(0.49, 0.49);
								display: inline-block;
								line-height: $registerItemH;
								height: $registerItemH;
								color: rgba(7, 17, 27, .2);
							}
						}
					}
				}
			}
			.registerBtnWrapper {
				text-align: center;
				width: 60%;
				margin-left: 20%;
				padding: .2rem 0;
				background-color: $appMainColor;
				@include borderRadius(.1rem);
				text-align: center;
				.register-text {
					vertical-align: top;
					color: white;
					font-size: .9rem;
				}
			}
		}
	}
</style>