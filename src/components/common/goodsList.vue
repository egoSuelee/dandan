
<!-- 组件说明: 商品列表展示界面, 用于订单管理(待付款, 待发货, 待取货, 已发货, 已完成) -->
<template>
	<div class="goodsWrapper">
		<div class="contentWrapper">
			<div class="goodsListWrapper">
				<ul class="goods-list">
					<li v-for = 'goods in goodsList' class="goods-item"> 
						<div class="iconWrapper">
							<img :src="getImgPath(goods.cGoodsImagePath)" />
						</div>
						<div class="goodsInfoWrapper">
							<div class="top">
								<div class="goodsNameWrapper ellipsis">
									<span class="goods-name">{{goods.cGoodsName}}</span>
								</div>
							</div>
							<div class="bottom">
								<div class="priceWrapper">
									<span class="price">¥&nbsp;{{goods.bOnLine_Price}}</span>
								</div>
								<div class="goodsCountsWrapper">
									<span class="expectCounts">数量:&nbsp;x{{goods.goodsCount}}</span>
									<span class="realCounts" v-if='showRealGoodsNum'>实际配送:&nbsp;{{parseFloat(goods.RealityNum)}}</span>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="summaryOperateWrapper" v-if='showsummaryOperate'>
				<div class="summaryWrapper">
					<p class="summary">
						共<b class="totoalCount">&nbsp;{{goodsCount}}&nbsp;</b>件商品&nbsp;
						合计<b class="totalMoney">¥&nbsp;{{parseFloat(summaryInfo.allMoney)}}&nbsp;</b>元(含运费<span class="freight">{{parseFloat(summaryInfo.freight)}}</span>元)
					</p>
				</div>
				<div class="operateWrapper">
					<ul class="operate-list">
						<li v-for = 'btn in btnList' class="operate-item" :class = "{'specialItem':btn.isSpecial}">
							<span class="button" :class = "{'specialBtn':btn.isSpecial}">{{btn.title}}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>	
</template>

<script>
import {getImgPath} from './mixin'
	export default {
		data() {
			return {
			}
		},
		props: ['goodsList', 'showRealGoodsNum', 'showsummaryOperate', 'summaryInfo', 'btnList'],
		computed: {
			goodsCount: function() {
				return this.goodsList.length;
			},
			totalMoney: function() {
				if (this.goodsList.length === 0) {
					return 0
				} else {
					return 100;
				}
			}
		},
		watch: {
			// goodsList: function() {
			// 	console.log(this.goodsList);
			// }
		},
		mixins: [getImgPath],
		created() {
			this.map_goodsListData();
		},
		methods: {
			map_goodsListData() {
				this.goodsList.map((goods) => {
					if (!goods.goodsCount && goods.Num) {
						this.$set(goods, 'goodsCount', parseFloat(goods.Num));
					}
					if (!goods.bOnLine_Price && goods.Last_Price) {
						this.$set(goods, 'bOnLine_Price', parseFloat(goods.Last_Price));
					}

				});
				console.log(this.btnList);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
$goodsListHeight: 3rem;
$halfGoodsListHeight: $goodsListHeight/2;
$textColor: rgba(224, 128, 49, 1);
$clear: rgba(0,0,0,0);
	.goodsWrapper {
		.contentWrapper {
			.goodsListWrapper {
				.goods-list {
					display: block;
					width: 100%;
					.goods-item {
						display: flex;
						width: 100%;
						height: $goodsListHeight;
						padding-left: .5rem;
						@include border1px(rgba(10, 20, 30, 0.1));
						.iconWrapper {
							width: $goodsListHeight;
							img {
								display: inline-block;
								@include wh(2.5rem, 2.5rem);
								margin-top: .25rem;
								@include borderRadius(.2rem);
							}
						}
						.goodsInfoWrapper {
							flex: 1;
							display: flex;
							flex-direction: column;
							width: 100%;
							.top {
								flex: 1;
								.goodsNameWrapper {
									margin-left: .3rem;
									.goods-name {
										font-size: .8rem;
										height: $halfGoodsListHeight;
										line-height: $halfGoodsListHeight;
									}
								}
							}
							.bottom {
								flex: 1;
								display: flex;
								.priceWrapper {
									margin-left: .3rem;
									.price {
										height: $halfGoodsListHeight;
										line-height: $halfGoodsListHeight;
										font-size: .8rem;
										color: $textColor;
									}
								}
								.goodsCountsWrapper {
									flex: 1;
									text-align: right;
									margin-left: .3rem;
									margin-right: .5rem;
									.expectCounts {
										display: inline-block;
										vertical-align: top;
										height: $halfGoodsListHeight;
										line-height: $halfGoodsListHeight;
										font-size: .7rem;
									}
									.realCounts {
										display: inline-block;
										height: $halfGoodsListHeight;
										line-height: $halfGoodsListHeight;
										font-size: .7rem;
										overflow: hidden;
									}
								}
							}
						}
					}
				}
			}
			.summaryOperateWrapper {
				.summaryWrapper {
					.summary {
						font-size: .75rem;
						text-align: right;
						padding: .2rem .3rem;
						.totoalCount, .totalMoney {
							color: $textColor; 
						}
					}
				}
				.operateWrapper {
					.operate-list {
						width: 100%;
						padding: .3rem 0;
						display: flex;
						flex-direction: row-reverse;
						.operate-item {
							display: inline-block;
							height: 100%;
							margin-right: .7rem;
							background-color: $clear;
							border: 1px solid rgba(7, 17, 27, 0.2);
							@include borderRadius(.15rem);
							.button {
								display: inline-block;
								width: 100%;
								height: 100%;
								line-height: $halfGoodsListHeight;
								color: rgba(7, 17, 27, 0.6);
								padding: 0 .35rem;
								font-size: .66rem;
							}
						}
						.specialItem {
							background-color: #eb3f2f;
							border: 1px solid #fb3f2f;
							.specialBtn {
								color: white;
							}
						}
					}
				}
			}
		}
	}

</style>




















