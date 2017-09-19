<template>	
	<div class="walletWrapper">
		<headerGuide :title = "title" :isShowBack = 'isShowBack'></headerGuide>
		<div class="contentWrapper">
			<div class="listWrapper">
				<ul class="list">
					<li class="item" v-for="item in items" :style="item.styleObj">
						<div class="textWrapper">
							<div class="icon">
								<i :class = "item.icon"></i>
							</div>
							<div class="title">
								<span class="title-text">{{item.title}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
export default {
	data() {
		return {
			title: "钱包",
			isShowBack: true,
			items: [
			{
				title: '转账', 
				icon: 'dandan-uniE925',
				styleObj:{background:'#ff9900'}
			},
			{
				title: '付款', 
				icon: 'dandan-uniE923',
				styleObj:{background:'#24b455'}
			},
			{
				title: '储值卡', 
				icon: 'dandan-uniE922',
				styleObj:{background:'#ff4238'}
			},
			{
				title: '余额', 
				icon: 'dandan-uniE924',
				styleObj:{background:'#ae1027'}
			},
			{
				title: '记录', 
				icon: 'dandan-uniE921',
				styleObj:{background:'#029ed9'}
			}
			]
		}
	},
	components: {
		headerGuide
	}
}
	
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
$screenW:16rem;
$margin:.5rem;
$margin-top: .4rem;
	.walletWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			.listWrapper {
				.list {
					display: flex;
					display: -webkit-flex;
					flex-wrap: wrap;
					width: 100%;
					padding: 0 $margin/2;
					.item {
						position: relative;
						display: flex;
						display: -webkit-flex;
						flex-direction: column;
						width: ($screenW/2) - ($margin*1.5);
						height: ($screenW/2) - ($margin*1.5);
						background-color: white;
						margin: $margin-top $margin/2 0 $margin/2;
						@include borderRadius(.2rem);
						// box-shadow: 0 0.026667rem 0.053333rem rgba(0,0,0,.1);
						// box-shadow:1px 1px $margin #666;
						// -ms-transform:rotate(1deg); /* IE 9 */
						// -moz-transform:rotate(1deg); /* Firefox */
						// -webkit-transform:rotate(1deg); /* Safari and Chrome */
						// -o-transform:rotate(1deg); /* Opera */
						// transform:rotate(1deg);
						.textWrapper {
							@include center;
							text-align: center;
							.icon {
								position: relative;
								display: block;
								i { 
									font-size: 3rem;
									color: white;
								}
							}
							.title {
								.title-text {
									color: white;
									font-size: .85rem;
								}
							}
						}
					}
				}
			}
		}
	}
</style>