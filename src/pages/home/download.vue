<template>
	<div class="downloadWrapper">
	<div class="bgWrapper">
		<div class="top"></div>
		<div class="bottom"></div>
	</div>
		<div class="contentWrapper">
			<div class="titleWrapper">
				<h3 class="title">[华隆]蛋蛋购物</h3>
				<span class="sologan">自在便利, 全心守候</span>
			</div>
			<ul class="paltform-list">
				<li class="paltform-item android">
					<span class="icon"><i class="dandan-andriod"></i></span>
					<span class="qrWrapper">
						<img src="/static/android_dandan_app.png" class="qrImg">
					</span>
				</li>
				<li class="paltform-item ios">
					<span class="icon"><i class="dandan-ios-apple"></i></span>
					<span class="qrWrapper">
						<img src="/static/ios_dandan_app.png" class="qrImg">
					</span>
				</li>
			</ul>
			<div class="footer">
				<span class="tip-text title">专业超市便利购物app</span>
				<span class="tip-text helpinfo">[更多特色]长按二维码识别即可下载</span>
			</div>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
	.downloadWrapper {
		width: 100%;
		height: 100%;
		background-color: white;
		.bgWrapper {
			position: absolute;
			z-index: 1;
			top: 0;
			left: 0;
			@include wh(100%, 100%);
			.top {
				width: 100%;
				height: 60%;
				background-color: white;
			}
			.bottom {
				width: 100%;
				height: 40%;
				background-image: -webkit-linear-gradient(92deg, #1d6aff, #5a93ff);
			}
		}
		.contentWrapper {
			position: absolute;
			top: 1%;
			left: 10%;
			width: 80%;
			z-index: 999;
			.titleWrapper {
				margin-bottom: 1rem;
				text-align: center;
				.title {
					color: #D04335;
					background-image: -webkit-linear-gradient(92deg, #e8220e, #f5788a);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					-webkit-animation: hue 60s infinite linear;
				}
				.sologan {
					color: #D04335;
					font-size: .8rem;
					background-image: -webkit-linear-gradient(92deg, #e8220e, #f5788a);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					-webkit-animation: hue 60s infinite linear;
				}
			}
			.paltform-list {
				// display: block;
				width: 100%;
				height: 100%;
				// display: flex;
				// flex-direction: column;
				box-shadow: -0.1rem -0.1rem .5rem rgba(7, 17, 27, .3);
				.paltform-item  {
					display: flex;
					// flex: 1;
					// margin: 1.5rem;
					background-color: #fff;
					// @include borderRadius(.1rem);
					// box-shadow: .1rem .1rem 1rem #ccc;
					.icon{
						width: 3rem;
						margin: 0 .4rem;
						position: relative;
						i {
							@include center;
							font-size: 3rem;
							color: #F1AF27;
							background-image: -webkit-linear-gradient(45deg, #1d6aff, #5a93ff);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
							-webkit-animation: hue 60s infinite linear;
						}
					}
					.qrWrapper {
						flex: 1;
						display: inline-block;
						@include wh(61.8%, 61.8%);
						padding: .3rem;
						position: relative;
						.qrImg {
							display: inline-block;
							margin-left: 10%;
							margin-top: 10%;
							width: 80%;
							height: 80%;
							box-shadow: -0.05rem -0.05rem .3rem rgba(7, 17, 27, .3);
						}
					}
				}
			}
			.footer {
				.tip-text {
					padding: .3rem .1rem;
					display: block;
					color: white;
				}
				.title {
					font-size: 1rem;
				}
				.helpinfo {
					font-size: .8rem;
				}
			}
		}
	}

</style>