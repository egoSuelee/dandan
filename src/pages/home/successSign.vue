<template>
	<div class="downloadWrapper">
	<div class="bgWrapper">
		<div class="top"></div>
		<div class="bottom"></div>
	</div>
		<div class="contentWrapper">
			<div class="titleWrapper">
				<span class="success-icon"><i class="dandan-uniE900"></i></span>
			</div>
			<div class="infoWrapper">
				<div class="success-title">签到成功</div>
				<ul class="userInfo-list">
					<h5 class="meeting-title">[钧策]2017北京总裁峰会</h5>
					<li class="userInfo-item">
						<span class="name title">姓名:</span>
						<span class="name value" style="font-weight: bold;">{{userInfo.UserName}}</span>
					</li>
					<li class="userInfo-item">
						<span class="name title">电话:</span>
						<span class="name value">{{userInfo.Tel}}</span>
					</li>
					<li class="userInfo-item">
						<span class="name title">公司:</span>
						<span class="name value">{{userInfo.remarks}}</span>
					</li>
					<li class="userInfo-item">
						<span class="name title">时间:</span>
						<span class="name value">{{userInfo.Date_time}}</span>
					</li>
				</ul>
			</div>
			
			<div class="footer">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				UserNo: null,
				userInfo: {}
			}
		},
		watch: {
			UserNo: function() {
				if (this.UserNo) {
					this.getUserInfo();
				}
			}
		},
		methods: {
			getUserInfo() {
				this.$api.post("Simple_online/Jun_ce_Select_UserMessage", {"UserNo": this.UserNo}, result => {
					console.log(result);
					if (result.resultStatus == '1') {
						console.log(result);
						let userInfoArr = result.dDate;
						if (userInfoArr.length > 0) {
							this.userInfo = userInfoArr[0];
						} else {
							this.userInfo = userInfoArr;
						}
						console.log("userInfo", this.userInfo);
					}
				});
			}
		},
		beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.UserNo = to.params.UserNo;
            })
        },
	}
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
				height: 30%;
				background-image: -webkit-linear-gradient(92deg, #1d6aff, #5a93ff);
				
			}
			.bottom {
				width: 100%;
				height: 70%;
				background-color: white;
			}
		}
		.contentWrapper {
			position: absolute;
			top: 8%;
			left: 5%;
			width: 90%;
			height: 84%;
			z-index: 666;
			.titleWrapper {
				position: relative;
				margin-bottom: 1rem;
				text-align: center;

				.success-icon {
					display: block;
					position: absolute;
					top: -0.5rem;
					left: 50%;
					transform: translateX(-50%);
					z-index: 999;
					background-color: white;
					border: 6px solid white;
					@include borderRadius(50%);
					i {
						color: #17d404;
						font-size: 3rem;
					}
				}
				
			}
			.infoWrapper {
				width: 100%;
				height: 100%;
				box-shadow: -0.1rem -0.1rem .5rem rgba(7, 17, 27, .3);
				.success-title {
					text-align: center;
					padding-top: 3rem;
					font-size: 1.2rem;
					color: #fff;
				}
				.userInfo-list {
					margin-top: 1.5rem;
					.meeting-title {
						text-align: center;
						padding: .3rem 0;
						font-size: 0.96rem;
						color: #D04335;
						background-image: -webkit-linear-gradient(92deg, #e8220e, #f5788a);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
						-webkit-animation: hue 60s infinite linear;
					}
					.userInfo-item {
						display: flex;
						text-align: center;
						.title {
							color: #555;
							padding: .3rem .3rem .3rem 1.2rem;
							font-size: .86rem;
						}
						.value {
							flex: 1;
							color: #232323;
							font-size: .86rem;
							text-align: left;
							padding: .3rem .3rem .3rem .3rem;
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