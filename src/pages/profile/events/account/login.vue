<template>
	<div class="loginWrapper">
		<headerGuide :title = 'title' :isShowBack='true' :rightData="{'title':'注册', 'path':'/register'}"></headerGuide>
		<div class="contentWrapper">
			<ul class="login-list">
				<li class="login-item">
					<span class="title">用户名</span>
					<input type='text' name='username' class="textfield" v-model="username"/>
				</li>
				<li class="login-item">
					<span class="title">密码</span>
					<input type='password' name='username' class="textfield" v-model="password"/>
				</li>
			</ul>
			<div class="loginBtnWrapper" @touchstart="didClickLogin()">
				<span class="login-text">登录</span>
			</div>
			<div class="forgetPassword">
				<span class="forgetPassword-text">忘记密码?</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import headerGuide from '../../../../components/header/headerGuide'
	import md5 from 'js-md5'
	import {setStore, getStore} from '../../../../config/mUtils'
	export default {
		components: {
			headerGuide
		},
		data() {
			return {
				title: '登录',
				username: null,
				password: null
			}
		},
		computed: {
			...mapState([
				''
				])
		},
		methods: {
			...mapMutations([
				'USER_LOGIN_SUCCESS'
				]),
			didClickLogin() {
				if (this.username && this.password) {
					this.$api.post('/Simple_online/User_Log_in', {"UserNo":this.username, "Pass":md5(this.password), "cStoreNo":"000"}, result => {
						if (result.resultStatus == '1') {
							//用vuex管理用户信息
							console.log(result);
							this.USER_LOGIN_SUCCESS({userInfo: result.dDate});
							this.$router.push('/profile');
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.loginWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			.login-list {
				margin: 3rem 0 0.8rem 0;
				width: 100%;
				.login-item {
					display: flex;
					width: 100%;
					height: 2rem;
					background-color: white;
					@include border1px(rgba(7, 17, 27, .1));
					.title {
						flex: 1;
						height: 1.8rem;
						line-height: 1.8rem;
						margin-top: .1rem;
						font-size: .7rem;
						text-align: center;
					}
					.textfield {
						flex: 3;
						display: inline-block;
						height: 1.8rem;
						line-height: 1.8rem;
						margin-top: .1rem;
						font-size: .9rem;
					}
				}
			}
			.loginBtnWrapper {
				text-align: center;
				width: 60%;
				margin-left: 20%;
				padding: .2rem 0;
				background-color: $appMainColor;
				@include borderRadius(.1rem);
				text-align: center;
				.login-text {
					color: white;
					font-size: .9rem;
				}
			}
			.forgetPassword {
				width: 60%;
				margin-left: 20%;
				padding: .2rem 0;
				text-align: right;
				.forgetPassword-text{
					color:rgba(7, 17, 27, .6);
					text-align: right;
					font-size: .6rem;
					vertical-align: top;
					text-decoration: underline;
				}
			}
		}
	}
</style>