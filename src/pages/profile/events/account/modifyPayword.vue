<template>
	<div class="modifyPayWordWrapper">
		<div class="contentWrapper">
			<headerGuide :title = 'title' :isShowBack='true' class="headerGuide"></headerGuide>
			<div class="register-listWrapper">
				<ul class="register-list">
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
						<input type="text" name='tel' v-model = "confirmedPassword" class="textfield"/>
					</li>
				</ul>
			</div>
			<div class="registerBtnWrapper" @click="didConfirmModifyPayWord()">
				<span class="register-text">确定修改</span>
			</div>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'

export default {
	components: {
		headerGuide
	},
	data() {
		return {
			title: "修改支付密码",
			isGettingVerCode: false,
			countNum: 60,
			inputVerCode: null,
			password: null,
			confirmedPassword: null
		}
	},
	computed: {
		...mapState([
			'userInfo'
			]),
		verCodeText: function() {
			if (this.isGettingVerCode) {
				return '请(' + this.countNum +')s后重新获取';
			} else {
				return '获取验证码';
			}
		},
		tel: function() {
			if (this.userInfo.Tel) {
				console.log(this.userInfo.Tel);
				return this.userInfo.Tel
			}
		}
	},
	created() {
		this.INIT_USERINFO_FROMLOCAL()
	},
	mounted() {

	},
	methods: {
		...mapMutations([
			'INIT_USERINFO_FROMLOCAL'
			]),
		didConfirmModifyPayWord() {

		},
		getVerCode(){
			if (this.isGettingVerCode) {
				return
			} else {
				if (this.tel) {
					this.isGettingVerCode = true;
					this.countRemainingSeconds();
					this.$api.post('/Simple_online/Get_TelPhone_Code', {"Tel":this.tel, "reg_or_update": "0"}, result => {
						if (result.resultStatus == '1') {
							this.verCode = result.dDate;
							console.log(result.dDate);
						}
					});
				} else {
					console.log('手机号不能为空');
				}
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
	}
}
	
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
$registerItemH: 2rem;

	.modifyPayWordWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			.register-listWrapper {
				width: 100%;
				background: white;
				.register-list {
					margin-bottom: 1rem;
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