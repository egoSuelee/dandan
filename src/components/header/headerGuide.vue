<template>
	<div id="header_guide">
		<div class="headerWrapper">
			<div class="leftWrapper">
				<slot name='logo'></slot>
        		<slot name='search'></slot>
				<section class="head_goback" v-if="isShowBack" @click="$router.go(-1)">
		            <span class="back-icon">
		            	<i class="dandan-uniE913 back-icon-text"></i>
		            </span>
        		</section>
			</div>

			<div class="midWrapper">
				<span class="title">{{title}}</span>
			</div>

			<div class="rightWrapper">
				<div class="userLogin" v-if='rightData' @touchstart="gotoAddress()">
					<span class="login-text">{{rightData.title}}</span>
				</div>
				<slot name="edit"></slot>
        		<slot name="msite-title"></slot>
        		<slot name="changecity"></slot>
       			<slot name="changeLogin"></slot>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default {
		props: ['isShowBack', 'title', 'rightData'],
		computed: {
			lastRightTitle: function() {
				return '登录/注册'
			}
		},
		methods: {
			gotoAddress() {
				if (this.rightData) {
					this.$router.push(this.rightData.path);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
	#header_guide {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100;
		height: 1.95rem;
		width: 100%;
		background-color: $appMainColor;
		.headerWrapper {
			display: flex;
			width: 100%;
			height: 100%;
			.leftWrapper {
				height: 100%;
				flex: 2;
				.head_goback {
					left: 0.4rem;
			        @include wh(0.6rem, 0.8rem);
			        line-height: 2.2rem;
			        margin-left: .4rem;
			        .back-icon {
			        	.back-icon-text {
			        		font-size: 1.2rem;
			        		color: white;
			        	}
			        }
				}
			}
			.midWrapper {
				height: 100%;
				flex: 3;
				text-align: center;
				// background-color: black;
				.title {
					height: 1.95rem;
					line-height: 1.95rem;
					@include sc(0.9rem, white);
				}
			}
			.rightWrapper {
				height: 100%;
				flex: 2;
				.userLogin {
					position: relative;
					text-align: center;
					.login-text {
						display: inline-block;
						color: white;
						font-size: .7rem;
						height: 100%;
						width: 100%;
						line-height: $headerGuideH;
					}
				}
			}
		}
	}
</style>


