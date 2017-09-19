<template>
 	<div class="homeWrapper">
 		<headerGuide :title= "headerTitle"></headerGuide>
		<div class="contentWrapper" v-if="!showLoading">
			<!-- 广告轮播图 -->
			<div class="carouselWrapper">
				<div class="swiper-container">
			        <div class="swiper-wrapper">   
							<div class="swiper-slide carousel-item" v-for = '(item,index) in carousel'>
								<span class="describle">&nbsp;{{item.describe}}</span>
								<img class="carousel-img" :src="getAdImgPath(item.cGoodsImagePath)">
							</div>
			        </div>
			        <div class="swiper-pagination"></div>
			    </div>
			</div>
			<!-- 导航 -->
			<div class="menuWrapper">
				<ul class="menu-list">
					<li v-for = '(item, index) in menusList' class="menu-item">
						<div class="menu-itemWrapper">
							<span class="icon" :class="{'smaller-icon': index == 3}"><i :class="item.icon"></i></span>
							<span class="title">{{item.title}}</span>
						</div>
					</li>
				</ul>
			</div>
			<!-- 特产商品 -->
			<div class="specialtyWrapper">
				<ul class="salesGoods-list">
					<li v-for = '(item,index) in salesGoods' class="salesGoods-item">
						<div class="salesGoods-itemWrapper">
							<span class="goodsName">{{item.cGoodsName}}</span>
						</div>
					</li>
				</ul>
			</div>
			<!-- 热销商品清单 -->
			<div class="hotGoodsWrapper">
				<div class="hotGoodsBox">
					<ul class="hotGoods-list">
						<li v-for='(item, listIndex) in listGoodsData' class="hotGoods-item">
							<div class="typeGoodsWrapper">
								<div class="top-titleWrapper">
									
									<div class="bottomPart" :style="{'background-color':colorLibs[(listIndex+3)%colorLibs.length]}">
										<span>{{mapDic[item.type]}}</span>
									</div>
								</div>
								<div class="bottom-goodsWrapper">
									<div class="goods-swiper-container">
										<div class="swiper-wrapper">   
											<div class="swiper-slide goods-item" v-for = '(goodsItem, goodsIndex) in item.goodsData' @click = "didSelectGoods(goodsItem.cGoodsNo)">
												<div class="goods-iconWrapper">
													<img :src="getImgPath(goodsItem.cGoodsImagePath)" onerror="javascript:this.src='/static/dandan_placeholder_img.png';" />
												</div>
												<div class="goodsInfoWrapper">
													<span class="goodsName goodsInfo-item ellipsis">{{goodsItem.cGoodsName}}</span>
													<span class="goodsUnit goodsInfo-item ellipsis">单位&nbsp;{{goodsItem.cUnit}}</span>
													<span class="goodsPrice goodsInfo-item">¥&nbsp;{{goodsItem.bOnLine_Price}}</span>
													<div class="decrIncrWrapper">
														<div class="baseWrapper">
															<span class="decrease" v-show="goodsItem.counts > 0" @click = 'decreaseGoods(listIndex, goodsIndex)'>
																<i class="dandan-uniE901"></i>
															</span>
															<span class="counts" v-show="goodsItem.counts > 0">{{goodsItem.counts}}</span>
															<span class="increase" @click="increaseGoods(listIndex, goodsIndex)">
																<i class="dandan-uniE902"></i>
															</span>
														</div>
													</div>
												</div>
											</div>
								        </div>
									</div>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div v-if="showLoading">
			<loading></loading>
		</div>
		<footerGuide></footerGuide>
	</div>
</template>

<script>
import {mapMutations} from 'vuex'
import footerGuide from '../../components/footer/footerGuide'
import headerGuide from '../../components/header/headerGuide'
import loading from '../../components/common/loading'
import md5 from 'js-md5'
import {getImgPath, getAdImgPath} from '../../components/common/mixin'
import '../../plugins/swiper.min.js'
import '../../style/swiper.min.css'


var carouselIndex = 0;
	export default {
		components: {
			footerGuide,
			headerGuide,
			loading
		},
		data() {
			return {
				headerTitle: "首页",
				dataDic: {},
				carousel: [],
				listGoodsData: [],
				salesGoods:[],
				mapDic: {'bestSellVegetables':'热销蔬菜', 'bestSellFruits':'热销水果', 'dailyHotGoods':'每日爆款', 'bestSellDailyGoods':'热销百货', 'bestSellFishMeat':'热销鱼肉', 'bestSellStoreageCards':'储值卡'},
				colorLibs: ['#FFD700','#F6AD45','#F0714E','#DC143C','#81B81B','#EF865E','#59A8ED','#CD853F'],
				menusList: [{title: "我常买", icon: 'dandan-oftenBuy'},{title: '热销排行',icon: 'dandan-rank'},{title: '分类',icon: 'dandan-category'},{title: "活动",icon: 'dandan-sales'}],
				showLoading: false
			}
		},
		created() {
			this.get_HomePageData();
		},
		mounted() {
		},
		computed: {
		},
		mixins: [getImgPath, getAdImgPath],
		watch: {
		},
		methods: {
			...mapMutations([
				'ADD_CART', 'REDUCE_CART'
			]),
			get_HomePageData: function () {
				this.showLoading = true;
				this.$api.post("/Simple_online/Select_HomePage_Info",'',result => {
			    	if (result.resultStatus == '1') {
			    		this.dataDic = result.dDate;
        				if (typeof this.dataDic == 'object') {
        					this.carousel = this.dataDic.carousel;
        					this.listGoodsData = this.dataDic.listsGoods;
        					this.salesGoods = this.dataDic.salesGoods;
        					this.showLoading = false;
        				}
        				this.$nextTick(function () {
      						new Swiper('.swiper-container', {
			     	 			pagination: '.swiper-pagination',
					        	autoplay: 2000,
					        	loop: true,
					        	direction:'horizontal',
					        	autoplayDisableOnInteraction : false
					   		});
					   		new Swiper('.goods-swiper-container', {
					   			slidesPerView : 2.5,
					   		});
      					})
			    	}    
        		});
     	 	},
     	 	increaseGoods(listIndex, goodsIndex) {
     	 		console.log("商品索引:" +"[" + listIndex + "," + goodsIndex + "]");
     	 		let listGoodsArray = this.listGoodsData[listIndex];
     	 		if (listGoodsArray) {
     	 			let goodsItemArray = listGoodsArray.goodsData;
     	 			let goodsItem = goodsItemArray[goodsIndex];
     	 			if (!goodsItem.counts) {
     	 				this.$set(goodsItem, 'counts', 1);
     	 			} else {
     	 				goodsItem.counts++;
     	 			}
     	 			//用vuex管理购物车
     	 			let [cGoodsNo, cGoodsImagePath, RowNumber, Show_Level, bFresh, bOnLine_Price, cGoodsName, cSpec, cUnit, fNormalPrice, fVipPrice, Last_Price] = [goodsItem.cGoodsNo, goodsItem.cGoodsImagePath, goodsItem.RowNumber, goodsItem.Show_Level, goodsItem.bFresh, goodsItem.bOnLine_Price, goodsItem.cGoodsName, goodsItem.cSpec, goodsItem.cUnit, goodsItem.fNormalPrice, goodsItem.fVipPrice, goodsItem.Last_Price];
     	 			this.ADD_CART({cGoodsNo:goodsItem.cGoodsNo, cGoodsImagePath, RowNumber, Show_Level, bFresh, bOnLine_Price, cGoodsName, cSpec, cUnit, fNormalPrice, fVipPrice});
     	 			let e = window.event;
					if(e) {
						e.stopPropagation();
					}
     	 		}
     	 	},
     	 	decreaseGoods(listIndex, goodsIndex) {
     	 		let listGoodsArray = this.listGoodsData[listIndex];
     	 		if (listGoodsArray) {
     	 			let goodsItemArray = listGoodsArray.goodsData;
     	 			let goodsItem = goodsItemArray[goodsIndex];
     	 			if (!goodsItem.counts) {
     	 				return
     	 			} else {
     	 				goodsItem.counts--;
     	 			}
     	 			//用vuex管理购物车
     	 			let cGoodsNo = goodsItem.cGoodsNo;
					this.REDUCE_CART({cGoodsNo: cGoodsNo});
					let e = window.event;
					if(e) {
						e.stopPropagation();
					}
     	 		}
     	 	},
     	 	didSelectGoods(cGoodsNo) {
     	 		if (cGoodsNo) {
					this.$router.push("/goodsDetail/" + cGoodsNo);
				}
     	 	}
		}
	};
</script>

<style lang='scss' scoped>
@import '../../style/mixin';

$carouselH:9rem;
$menuItemH:4rem;
$salesGoodsItemH: 5rem;
$typeGoodsItemH: 12rem;
$marginLeft: .3rem;
$goodsIconH:6.4rem;
$goodsInfoH:3.2rem;
	.homeWrapper {
		padding-top: $headerGuideH;
		padding-bottom: $footerGuideH*1.2;
		background-color: white;
		.contentWrapper {
			.carouselWrapper {
				height: $carouselH;
				width: 100%;
				.swiper-container {
					height: $carouselH;
					width: 100%;
					.carousel-item {
						
						position: relative;
						text-align: center;
						@include wh(100%, 100%);
						.describle {
							position: absolute;
							bottom: 1.4rem;
							right: .6rem;
							font-size: .6rem;
							color: rgba(7, 17, 27, .6);
						}
						.carousel-img {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
			.menuWrapper {
				height: $menuItemH;
				.menu-list {
					display: flex;
					.menu-item {
						flex: 1;
						height: $menuItemH;
						width: 100%;
						position: relative;
						.menu-itemWrapper {
							@include center;
							width: 80%;
							height: 80%;
							text-align: center;
							.icon {
								display: block;
								padding: .1rem;
								i {
									// color: $appMainColor;
									color: #ef7044;
									font-size: 1.8rem;
								}
							}
							.smaller-icon {
								i {
									display: inline-block;
									transform:scale(1.32);
								}
							}
							.title {
								display: block;
								font-size: .6rem;
							}
						}
					}
				}
			}
			.specialtyWrapper {
				.salesGoods-list {
					.salesGoods-item {
						height: $salesGoodsItemH;
						padding: .2rem .6rem;
						text-align: center;
						.salesGoods-itemWrapper {
							width: 100%;
							height: 100%;
							background-color: $appMainColor;
							@include borderRadius(.2rem);
							.goodsName {
								font-size: .8rem;
								color: white;
							}
						}
					}
				}
			}
			.hotGoodsWrapper {
				.hotGoodsBox {
					.hotGoods-list {
						.hotGoods-item {
							height: $typeGoodsItemH;
							// @include border1px_top_bottom(rgba(7, 17, 27, .1));
							.typeGoodsWrapper {
								.top-titleWrapper {
									height: $typeGoodsItemH*0.2;
									.bottomPart {
										position: relative;
										width: 100%;
										height: 70%;
										top: 25%;
										span {
											display: block;
											padding-left: .8rem;
											@include ct;
											color: white;
											font-size: .8rem;

										}
									}
								}
								.bottom-goodsWrapper {
									overflow: hidden;
									height: $typeGoodsItemH*0.8;
									.goods-swiper-container {
										width: 100%;
										height: $typeGoodsItemH*0.8;
										.goods-iconWrapper {
											@include wh($goodsIconH,$goodsIconH);
											position: relative;
											img {
												@include center;
												@include wh(90%, 90%);
											}
										}
										.goodsInfoWrapper {
											@include wh($goodsIconH,$goodsInfoH);
											position: relative;
											display: flex;
											display: -webkit-flex;
											flex-direction: column;
											.goodsInfo-item {
												display: block;
												padding-left: .3rem;
											}
											.goodsName {
												flex: 3;
												font-size: .72rem;
											}
											.goodsUnit {
												flex: 2;
												font-size: .6rem;

											}
											.goodsPrice {
												flex: 3;
												color: #F0714E;
												font-size: .6rem;
												height: 1.2rem;
												line-height: 1.2rem;
											}
											.decrIncrWrapper {
												position: absolute;
												right: 0.35rem;
												bottom: 0;
												height: 1.2rem;
												.baseWrapper {
													height: 100%;
													.decrease {
														display: inline-block;
														height: 1.2rem;
														line-height: 1.2rem;
														i {
															color: $appMainColor;
															font-size: 1rem;
														}
													}
													.counts {
														display: inline-block;
														height: 1.2rem;
														line-height: 1.2rem;
														font-size: .65rem;
														vertical-align: top;
													}
													.increase {
														display: inline-block;
														height: 1.2rem;
														line-height: 1.2rem;
														i {
															color: $appMainColor;
															font-size: 1rem;
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
</style>



















