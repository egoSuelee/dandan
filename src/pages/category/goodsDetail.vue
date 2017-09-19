<template>
	<div class="goodsDetailWrapper">
		<headerGuide :title="title" :isShowBack='true'></headerGuide>
		<div class="contentWrapper">
			<div class="goodsIconWrapper">
				<img :src="getImgPath(goods.cGoodsImagePath)" :alt="goods.cGoodsName" />
			</div>
			<div class="goodsInfoWrapper">
				<div class="goodsName">
					<span class="goodsName-text">[{{goods.cGoodsName}}]</span>
				</div>
				<div class="goodsSologen">
					<span class="goodsSologen-text">路发万家  新鲜到家
					</span>
				</div>
				<div class="payWaysWrapper">
					<ul class="payway-list">
						<li v-for='(item,index) in payStyles' class="payway-item">
							<span class="payway-describle" :style="payDomStyleObj[index%payDomStyleObj.length]">{{item.Describe}}</span>
						</li>
					</ul>
				</div>
				<div class="priceWrapper">
					<span class="online-price">
						<span class="intPart">¥{{splitFloats(goods.bOnLine_Price)[0]}}.</span><span class="decimalPart">{{splitFloats(goods.bOnLine_Price)[1]}}</span>
					</span>
					<span class="normal-price">¥{{goods.bOnLine_Price}}</span>
				</div>
				<div class="salesWrapper">
					<ul class="sales-list">
						<li class="sales-item"><span class="title">销量:&nbsp;</span><span class="value">{{beBigNumber(goods.Sale_number)}}</span></li>
						<li class="sales-item"><span class="title">库存:&nbsp;</span><span class="value">{{beBigNumber(goods.Stock_number)}}</span></li>
						<li class="sales-item"><span class="title">浏览量:&nbsp;</span><span class="value">{{goods.Browse_number}}</span></li>
					</ul>
				</div>
				<div class="goodsDescrileWrapper">
					<div class="title"><h6>商品描述</h6></div>
					<div class="describle">
						<span class="describle-text">{{goods.Description}}
							<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
							</p>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="fixedFooter">
			<ul class="footer-list">
				<li class="footer-item shopcart" @click="gotoShopCart()">
					<span class="item-text">购物车</span>
					<div class="bageWrapper" v-show ="bageValue>0"><span class="bage-value">{{bageValue}}</span></div>
				</li>
				<!-- <li class="footer-item share">
					<span class="item-text">分享</span>
				</li> -->
				<li class="footer-item collect">
					<span class="item-text">收藏</span>
				</li>
				<li class="footer-item add-shopcart"  @click = 'increaseGoods()'>
					<span class="item-text">加入购物车</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../components/header/headerGuide'
import {mapMutations, mapState} from 'vuex'
import {getImgPath} from '../../components/common/mixin'
	export default {
		data() {
			return {
				cGoodsNo: null,
				goods: {},
        		payStyles: [],
        		payDomStyleObj: [{border: '1px solid #F0714E', color: '#F0714E'}, {border: '1px solid #DC143C', color: '#DC143C'}, {border: '1px solid #81B81B', color: '#81B81B'}],
        		isShow: false,
        		colorLibs: ['#FFD700','#F6AD45','#F0714E','#DC143C','#81B81B','#EF865E','#59A8ED','#CD853F']
			}
		}, 
		created() {
		},
		watch: {
			cGoodsNo: function() {
				if (this.cGoodsNo) {
					this.getGoodsDetailData();
				}
			},
			
		},
		mixins: [getImgPath],
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
	        },
			title: function() {
				if (this.goodsModel) {
					return this.goods.cGoodsName;
				} else {
					return '商品详情';
				}
			}
		},
		methods: {
			...mapMutations([
				'ADD_CART', 'REDUCE_CART', 'MODIFY_HOMEINDEX'
			]),
			getGoodsDetailData: function () {
	        	this.$api.post("/Simple_online/Select_GoodsDetail",{"cGoodsNo":this.cGoodsNo,"UserNo":"","cStoreNo":"000"},result => {
	           		console.log(result)
		            if (result.resultStatus === "1") {
		                this.goods = result.array[0];
		                this.payStyles 	= result.array2
		                this.isShow 	= true
		            }
        		});
      		},
      		gotoShopCart() {
				this.MODIFY_HOMEINDEX({selectedIndex:2});
				this.$router.push('/shopCart');
			},
      		increaseGoods() {
      			
      			if (!this.goods.bOnLine_Price) {
      				return
      			}
      			this.$set(this.goods, "cGoodsNo", this.cGoodsNo);
				
					if(!this.goods.counts) {
						//这种方法添加的属性, vue是可以监测到他的变化.
						this.$set(this.goods, 'counts', 1);
					} else {
						this.goods.counts += 1;
					}
					let goods = this.goods;
      				console.log(goods);
				
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
					this.ADD_CART({cGoodsNo:goods.cGoodsNo, cGoodsImagePath, RowNumber,Show_Level, bFresh, bOnLine_Price, cGoodsName, cSpec, cUnit,fNormalPrice, fVipPrice});				
					let e = window.event;

					if(e) {
						e.stopPropagation();
					}
				
				
			},
      		splitFloats:function(str) {
      			if (typeof str == 'string') {
      				return str.split('.');
      			} else {
      				return [0, 0];
      			}
      		},
      		beBigNumber(str) {
      			if (typeof str == 'string') {
      				let initValue = parseInt(str);
      				if (isNaN(initValue)) {
      					return this.beBigNumber('100');
      				}
      				//let result = initValue + Math.round(Math.random()*100);
      				let result = initValue + 1;
      				return result;
      			}
      		}
		},
		beforeRouteEnter(to, from, next) {
            next((vm) => {
                vm.cGoodsNo = to.params.cGoodsNo;
            })
        },
		components: {
			headerGuide
		}
	}
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
$fixedFooterH: 1.95rem;

	.goodsDetailWrapper {
		padding-top: $headerGuideH;
		padding-bottom: $fixedFooterH;
		background-color: white;
		.contentWrapper {
			.goodsIconWrapper {
				width: 100%;
				height: 9rem;
				text-align: center;
				img {
					height: 9rem;
				}
			}
			.goodsInfoWrapper {
				.goodsName {
					text-align: center;
					font-size: .85rem;
					padding: .5rem;
					font-weight: bold;
				}
				.goodsSologen {
					text-align: center;
					padding: .1rem 2rem .1rem 2rem;
					font-size: .65rem;
					.goodsSologen-text {
						color: rgba(7, 17, 27, .6);
					}
				}
				.payWaysWrapper {
					.payway-list {
						text-align: center;
						.payway-item {
							display: inline-block;
							text-align: center;
							margin: .3rem;
							.payway-describle {
								font-size: .55rem;
								padding: .1rem .6rem;
								display: inline-block;
								border: 1px solid $appMainColor;
								@include borderRadius(2rem);
								color: $appMainColor;
							}
						}
					}
				}
				.priceWrapper {
					padding: .1rem .4rem;
					text-align: center;
					.online-price {
						.intPart {
							font-size: 1.2rem;
							color: #F0714E;
						}
						.decimalPart {
							font-size: 0.9rem;
							color: #F0714E;
						}
					}
					.normal-price {
						font-size: .72rem;
						color: rgba(7, 17, 27, .6);
						text-decoration: line-through;
						padding-left: .3rem;
					}
				}
				.salesWrapper {
					.sales-list {
						text-align: center;
						.sales-item {
							display: inline-block;
							text-align: center;
							margin: .3rem;
							.title {
								font-size: .63rem;
								color: rgba(7, 17, 27, .6);
							}
							.value {
								font-size: .72rem;
								color: rgba(7, 17, 27, .6);
							}
						}
					}
				}
				.goodsDescrileWrapper {
					width: 100%;
					margin-top: .5rem;
					.title {
						padding: .5rem .3rem .3rem .3rem;
						@include border1px(rgba(7, 17, 27, .3));
					}
					.describle {
						padding: .5rem 1rem;
						.describle-text {
							font-size: .72rem;
						}
					}
				}
			}
		}
		.fixedFooter {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: $fixedFooterH;
			background-color: white;
			border-top: 1px solid rgba(7, 17, 27, .2);
			//box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
			.footer-list {
				display: flex;
				text-align: center;
				.footer-item {
					flex: 1;
					font-size: .65rem;
					.item-text {
						display: block;
						line-height: $fixedFooterH;
						height: $fixedFooterH;
						border-right: 1px solid rgba(7, 17, 27, .2);
					}
				}
				.shopcart {
					position: relative;
					.bageWrapper {
						position: absolute;
						top: 0.2rem;
						right: 0;
						background-color:#DC143C; 
						height: 0.65rem;
						text-align: center;
						overflow: hidden;
						padding: 0rem .3rem;
						@include borderRadius(.3rem);
						transform:translateX(-50%); 
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
				.collect {
					.item-text {
						border-right: none;
					}
				}
				.add-shopcart {
					flex: 2;
					display: block;
					background-color: #F6AD45;
					transform: translate(0, -1px);
					z-index: 100;
					.item-text {
						color: white;
						font-size: .8rem;
						border-right: none;
					}
				}
			}
		}
	}
</style>










