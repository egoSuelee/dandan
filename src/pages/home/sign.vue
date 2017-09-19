<template>
	<div class="signWrapper">
		<div class="contentWrapper">
			<div class="content">
				<h4 class="sign-title">[钧策]北京总裁峰会签到</h4>
				<div class="inputWrapper">
					<input class="tel-input" type="text" name="tel" v-model="tel" placeholder="请输入您的手机号签到" />
				</div>
				<div class="sign-button" @click="sign()">
							<span class="sign-text">签到</span>
				</div>
			</div>
		</div>
		<alertTipAlt v-if="showAlert" :alertText="alertText" @closeTip="closeTip()"></alertTipAlt>
	</div>
</template>

<script>
import alertTipAlt from '../../components/common/alertTipAlt'
import md5 from 'js-md5'
export default {
	data() {
		return {
			tel: null,
			showAlert: false,
			alertText: null,
			isSignSuccess: false
		}
	},
	components: {
		alertTipAlt
	},
	created() {

	},
	methods: {
		closeTip() {
			this.showAlert = false;
			if (this.isSignSuccess) {
				this.$router.push('/download');
			}
		},
		sign() {
			if (!this.tel) {
				this.showAlert = true;
				this.alertText = "手机号不能为空";
				return false;
			}
			if(!(/^1[34578]\d{9}$/.test(this.tel))){ 
        		this.showAlert = true;
				this.alertText = "手机号格式错误, 请重填";  
        		return false; 
    		} 
    		let [userTel, enUserTel] = [this.tel, md5((this.tel + "ware"))];
    		this.$api.post("/Simple_online/Jun_ceCheck_in", {"UserNo":userTel, "Sign":enUserTel}, result => {
   	 			if (result.resultStatus == "1") {
   	 				this.showAlert = true;
   	 				this.alertText = "签到成功!";
   	 				this.isSignSuccess = true;
   	 				return true;
   	 			} else {
   	 				this.showAlert = true;
   	 				this.alertText = result.dDate;
   	 				return false;
   	 			}
   	 		})
		},
		customerSign() {
     	 	let userNo = '13125043081';
     	 	let unEncriptSign = userNo + 'ware';
     		this.$api.post("/Simple_online/Jun_ceCheck_in", {"UserNo":userNo, "Sign":md5(unEncriptSign)}, result => {
   	 			console.log(result);
   	 		})
     	 },
	}
}

</script>

<style lang="scss" scoped>
@import '../../style/mixin';

:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(7, 17, 27, .2); opacity:1; font-size: .9rem;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(7, 17, 27, .2);opacity:1; font-size: .9rem;
}

input:-ms-input-placeholder{
    color: rgba(7, 17, 27, .2);opacity:1;font-size: .9rem;
}

input::-webkit-input-placeholder{
    color: rgba(7, 17, 27, .2);opacity:1;font-size: .9rem;
}

	.signWrapper {
		@include wh(100%, 100%);
		background-color: #fff;
		padding-top: 10%;
		.contentWrapper {
			@include wh(100%, 80%);
			position: relative;
			.content {
				.sign-title {
					display: block;
					width: 100%;
					margin-left: 50%;
					transform: translateX(-50%);
					text-align: center;
					font-size: 1.2rem;
			   	    color: #f35626;
				 	background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					-webkit-animation: hue 60s infinite linear;
				}
				.inputWrapper {
					margin-top: 1.5rem;
					height: 2.4rem;
					width: 100%;
					position: relative;
					// @include border1px_top_bottom(rgba(7, 17, 27, .2));
					.tel-input {
						text-align: center;
						height: 2.4rem;
						width: 100%;
						font-size: 1.8rem;
						padding: 0 .5rem;
					}
					&:after {
						position: absolute;
						left: 10%;
						bottom: 0;
						width: 80%;
						border:1px solid #feab3a;
						content: ' ';
					}
				}
				.sign-button {
					width: 4rem;
					height: 4rem;
					background-image: -webkit-linear-gradient(92deg,#f35626,#feab3a);
					@include borderRadius(50%);
					margin-left: 50%;
					transform: translateX(-50%);
					text-align: center;
					margin-top: 1.5rem;
					.sign-text {
						color: white;
						display: inline-block;
						height: 4rem;
						line-height: 4rem;
						font-weight: bold;
					}
				}
			}
		}
	}
</style>