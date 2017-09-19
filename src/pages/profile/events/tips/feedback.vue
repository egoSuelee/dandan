<template>	
	<div class="feedbackWrapper">
		<headerGuide :title = "title" :isShowBack = 'isShowBack'></headerGuide>
		<div class="contentWrapper">
			<div class="iconWrapper">
				<div class="imgBox">
					<img src="/static/hlm_logo_60@3x.png" />
				</div>
			</div>
			<div class="app-versionWrapper">
				<span class="version-text">蛋蛋购物H5,版本号1.0</span>
			</div>
			<div class="feedbackContent">
				<div class="titleWrapper"><span class="title">意见反馈*</span></div>
				<div class="inputWrapper"><textarea class="textField" v-model = 'feedbackContent'></textarea></div>
			</div>
			<div class="commitBtn" @touchstart="didClickCommit()">
				<span class="commit-text">提交</span>
			</div>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
export default {
	data() {
		return {
			title: "意见反馈",
			isShowBack: true,
			feedbackContent: null
		}
	},
	methods: {
		didClickCommit() {
			if (!this.feedbackContent) {
				alert('反馈内容不能为空');
			} else {	
				let params = {'UserNo':'13125022222', 'Suggestions':this.feedbackContent}
				this.$api.post('/Simple_online/User_Suggestion', params, result => {
					if (result.resultStatus == '1') {
						alert('反馈成功!');
						this.$router.push('/profile');
					}
				});
			}
		}
	},
	components: {
		headerGuide
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.feedbackWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			.iconWrapper {
				margin: .8rem 0;
				text-align: center;
				.imgBox {
					position: relative;
					height: 90px;
					img {
						position: absolute;
						left: 50%;
						transform: translateX(-45px);
						display: block;
						width: 90px;
						height: 90px;
					}
				}
			}
			.app-versionWrapper {
				text-align: center;
				.version-text {
					font-size: .8rem;
					color: rgba(7, 17, 27, .4);
				}
			}
			.feedbackContent {
				margin-top: .8rem;
				.titleWrapper {
					padding-left: 1rem;
					.title {
						font-size: .7rem;
						color: rgba(7, 17, 27, .7);
					}
				}
				.inputWrapper {
					margin-top: .3rem;
					.textField {
						display: block;
						border-bottom: 1px solid rgba(7, 17, 27, .2);
						border-top: 1px solid rgba(7, 17, 27, .2);
						width: 100%;
						height: 9rem;
						resize: none;
						padding: 0.5rem .3rem;
						font-size: .8rem;
					}
				}
			}
			.commitBtn {
				margin-top: .5rem;
				text-align: center;
				width: 60%;
				margin-left: 20%;
				background-color: $appMainColor;
				@include borderRadius(.1rem);
				text-align: center;
				height: 2rem;
				.commit-text {
					display: inline-block;
					color: white;
					font-size: .9rem;
					line-height: 2rem;
					height: 2rem;
				}
			}
		}
	}
</style>