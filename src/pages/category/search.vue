<template>
	<div class="searchWrapper">
	<headerGuide :title = "headerTitle" :isShowBack="isShowBack"></headerGuide>
		<div class="contentWrapper">
			<div class="fixed-search-header">
				<div class="searchWrapper">
						<div class="searchField">
							<span class="search-icon"><i class="dandan-uniE91F"></i></span>
							<input type="text" name="search_text" class="input-search" v-model="searchText" placeholder="请输入商品名称搜索" />
						</div>
						<div class="search-title">
							<span class="search-title-text">搜索</span>
						</div>
				</div>
			</div>
			<div class="goodsWrapper">
				<ul>
					<li v-for = 'goods in goodsGroups' class="goods-item" @click="gotoAddress('/goodsDetail', goods)">
						<div class="icon">
							<img :src="'http://lufawj.iask.in:1237/Simple_onlineManger/images/Goods/'+ goods.cGoodsImagePath" />
						</div>
						<div class="content">
							<h2>{{goods.cGoodsName}}</h2>
							<p>{{goods.cSpec}}/{{goods.cUnit}}</p>
							<div class="price">
								<span class="onlinePrice">¥{{parseFloat(goods.bOnLine_Price)}}</span>
								<span class="normalPrice">¥{{parseFloat(goods.fNormalPrice)}}</span>
							</div>
						</div>
						<div class="decrIncrWrapper">
							<div class="baseWrapper">
								<span class="decrease" @click = 'decreaseGoods(goods)' v-show ='goods.counts > 0'>
									<i class="dandan-uniE901"></i>
								</span>
								<span class="counts" v-show = 'goods.counts > 0'>{{goods.counts}}</span>
								<span class="increase" @click = 'increaseGoods(goods)'>
									<i class="dandan-uniE902"></i>
								</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<footer class="loader_more" v-show="preventRepeatReuqest"></footer>
			<transition name="loading">
				<loading v-show="showLoading"></loading>
			</transition>
		</div>
		<div class="fixed-shopCart" @click="gotoShopCart()">
			<div class="bageWrapper" v-show ="bageValue>0"><span class="bage-value">{{bageValue}}</span></div>
			<span class="icon"><i class="dandan-cart"></i></span>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../components/header/headerGuide'
import {mapMutations, mapState} from 'vuex'
import {loadMore} from '../../components/common/mixin'
import loading from '../../components/common/loading'
import alertTip from '../../components/common/alertTip'

export default{
	data() {
		return {
			headerTitle: "商品检索",
			isShowBack: true,
			rankType: 1,
			number_of_pages: 1,
			//searchTypes: [{title: "默认"}, {title: "价格"}, {title:"销量"}, {title: "浏览数"}],
			selectedTypeIndex: 0,
			goodsGroups: [],
			preventRepeatReuqest: false,
			showLoading: true,
			searchText: null
		}
	},
	computed: {
		...mapState([
                'cartList'
            ]),
        bageValue: function() {
            let tmpGoodsCount = 0;
            let cart = Object.assign({},this.cartList);
             if(typeof cart == 'object') {
                let keys = Object.keys(cart);
                // console.log(keys);
                keys.forEach((key, index) => {
                    let goodsNum = cart[key].goodsCount;
                    if (goodsNum) { 
                        tmpGoodsCount += goodsNum;
                    }  
                });
                	return tmpGoodsCount;
                } else {
                	console.log('Opps!~~~~');
                	return 0;
            }
        }
	},
	mounted() {

	},
	watch: {

	},
	created() {
		this.hideLoading();
	},
	mixins: [loadMore],
	methods: {
		...mapMutations([
				'ADD_CART', 'REDUCE_CART', 'MODIFY_HOMEINDEX'
			]),
		increaseGoods(goods) {
				this.goodsGroups.forEach((element, index) => {
					if (goods.cGoodsNo === element.cGoodsNo) {
						if(!element.counts) {
							//这种方法添加的属性, vue是可以监测到他的变化.
							this.$set(element, 'counts', 1);
						} else {
							element.counts += 1;
						}
						//用vuex管理购物车
						let cGoodsNo 		= goods.cGoodsNo;
						let cGoodsImagePath = goods.cGoodsImagePath;
						let RowNumber 		= goods.RowNumber;
						let Show_Level 		= goods.Show_Level;
						let bFresh 			= goods.bFresh;
						let bOnLine_Price 	= goods.bOnLine_Price;
						let cGoodsName 		= goods.cGoodsName;
						let cSpec			= goods.cSpec;
						let cUnit			= goods.cUnit;
						let fNormalPrice	= goods.fNormalPrice;
						let fVipPrice		= goods.fVipPrice; 
						let Last_Price 		= goods.Last_Price
						this.ADD_CART({cGoodsNo:goods.cGoodsNo, cGoodsImagePath, RowNumber, Show_Level, bFresh, bOnLine_Price, cGoodsName, cSpec, cUnit, fNormalPrice, fVipPrice});
						
						let e = window.event;

						if(e) {
							e.stopPropagation();
						}
					}
				});
		},
		decreaseGoods(goods){
				this.goodsGroups.forEach((element, index) => {
					if (goods.cGoodsNo === element.cGoodsNo) {
						if (!element.counts) {
							return
						} else  {
							element.counts -= 1;
						}
						//用vuex管理购物车
						let cGoodsNo 		= goods.cGoodsNo;
						this.REDUCE_CART({cGoodsNo: cGoodsNo});
						let e = window.event;
						if(e) {
							e.stopPropagation();
						}
					}
				})
		},
		gotoAddress(path, goods) {
			if (path && goods.cGoodsNo) {
				this.$router.push(path + "/" + goods.cGoodsNo);
			}
		},
		gotoShopCart() {
			this.MODIFY_HOMEINDEX({selectedIndex:2});
			this.$router.push('/shopCart');
		},
		
		hideLoading(){
			if (process.env.NODE_ENV !== 'development') {
				clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					clearTimeout(this.timer);
					this.showLoading = false;
				}, 500)
			}else{
				this.showLoading = false;
			}
		},
	},
	components: {
		headerGuide,
		loading,
		alertTip
	}
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
$shopCartH: 1.6rem;
.searchWrapper {
	padding-top: $headerGuideH;
	.contentWrapper {
		.fixed-search-header {
			position: fixed;
			top: $headerGuideH;
			left: 0;
			width: 100%;
			z-index: 100;
			.searchWrapper {
				display: flex;
				display: -webkit-flex;
				background-color: $appMainColor;
				padding: .2rem .5rem;
				.searchField {
					position: relative;
					flex: 1;
					.search-icon {
						position: absolute;
						display: inline-block;
						width: 1.6rem;
						height: 1.6rem;
						i {
							font-size: 1.2rem;
							@include center;
							color: rgba(7, 17, 27, .4);
						}
					}
					.input-search {
						display: inline-block;
						vertical-align: top;
						height: 1.6rem;
						line-height: 1.6rem;
						background-color: white;
						width: 100%;
						font-size: 0.81rem;
						@include borderRadius(.8rem);
						padding-left: 1.8rem;
					}
				}
				.search-title {
					width: 3rem;
					height: 1.6rem;
					line-height: 1.6rem;
					font-size: .75rem;
					text-align: center;
					.search-title-text {
						color: white;
					}
				}
			}
		}
		.goodsWrapper {
			padding-top: 2rem;
			height: 100%;
			padding-bottom: 2rem;
			overflow: auto;
			overflow-x: hidden;
			.goods-item {
				position: relative;
				padding: 10px 10px 10px 10px;
				font-size: 14px;
				display: flex;
				background-color: white;
				@include border1px(rgba(7, 17, 27, .1));
				.icon {
					display: inline-block;
					width: 50px;
					height: 50px;
					vertical-align: top;
					img {
						width: 100%;
						height: 100%;
						@include borderRadius(4px);
					}
				}
				.content {
					flex: 1;
					display: inline-block;
					margin-left: 6px; 
					font-size: 12px;
					height: 100%;
					h2 {
						white-space: nowrap;
						text-overflow: ellipsis; 
						font-size: 14px;
					}
					.onlinePrice {
						font-size: 14px;
						color: rgb(243, 12, 12);
					}
					.normalPrice {
						margin-left: 8px;
						color: rgb(147, 153, 159);
						text-decoration: line-through;
					}
				}
				.decrIncrWrapper {
					position: absolute;
					display: flex;
					bottom: 10px;
					right: 10px;
					height: 30px;
					width: 100px;
					.baseWrapper {
						position: relative;
						top: 0px;
						left: 0px;
						width: 100%;
						height: 100%;
						span {
							position: absolute;
							display: inline-block;
							height: 33px;
							width: 33px;
							top: 0px;
							text-align: center;
							line-height: 30px;
						}
						.increase {
							left: 67px;
							i {
								font-size: 1.2rem;
								color: $blue;
							}
						}
						.decrease {
							left: 1px;
							i {
								font-size: 1.2rem;
								color: $blue;
							}
						}
						.counts {
							left: 34px;
							color: rgb(7, 17, 27);
						}
					}
				}
				
			}
			&:last-child {
				
			}
		}
	}
	.fixed-shopCart {
		position: fixed;
		bottom: $shopCartH;
		left: $shopCartH;
		@include wh($shopCartH, $shopCartH);
		.icon {
			i {
				color: $appMainColor;
				font-size: 1.6rem;
			}
		}
		.bageWrapper {
			position: absolute;
			top: 0;
			right: 0;
			background-color:#DC143C; 
			height: 0.65rem;
			text-align: center;
			overflow: hidden;
			padding: 0rem .3rem;
			@include borderRadius(.3rem);
			transform:translateX(50%); 
			.bage-value {
				display: inline-block;
				color: white;
				font-size: .65rem;
				vertical-align: top;
				height: .65rem;
				line-height: 0.65rem;
			}
		}
	}
}

</style>