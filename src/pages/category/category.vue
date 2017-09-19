<template>
<div class="category">
	<headerGuide :title="headerTitle">
		<span slot='search' class="searchWrapper" @click="$router.push('/search')">
			<span class="search">
				<i class="dandan-uniE91F"></i>
			</span>
		</span>
	</headerGuide>
	<div class="leftWrapper">
	  	<ul>
	  		<li v-for = "(goodsType,index) in leftGroups" :class = "{'selectedGoodsType-item':index == selectedGoodsTypeIndex}" @click = "goodsTypeDidClick(goodsType, index)">{{goodsType.cGroupTypeName}}</li>
	  	</ul>
	</div>
	<div class="rightWrapper">
		<div class="topWrapper">
			<ul>
			  	<li v-for = "(groupType, index) in topGroups" :class = "{'selectedGroupType-item': index == selectedGroupTypeIndex}" @click = "groupTypeDidClicked(groupType, index)"><span>{{groupType.cGroupTypeName}}</span></li>
			</ul>
		</div>
		  
		<div class="goodsWrapper">
			<ul class="goods-list" v-load-more ="loadMoreGoods">
				<li v-for = 'goods in goodsGroups' class="goods-item" @click="gotoAddress('/goodsDetail', goods)">
					<div class="icon">
						<img :src="getImgPath(goods.cGoodsImagePath)" onerror="javascript:this.src='/static/dandan_placeholder_img.png';" />
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
					<div class="bottom-line"></div>
				</li>
			</ul>
		</div>
	<footer class="loader_more" v-show="preventRepeatReuqest"></footer>
	<transition name="loading">
		<loading v-show="showLoading"></loading>
	</transition>
	</div>
	
	<footerGuide></footerGuide>
 </div>
</template>

<script>
import footerGuide from '../../components/footer/footerGuide'
import headerGuide from '../../components/header/headerGuide'
import {mapMutations} from 'vuex'
import {loadMore, getImgPath} from '../../components/common/mixin'
import loading from '../../components/common/loading'

	export default {
		props: [],
		data() {
			return {
				headerTitle: "分类/检索",
				topGroups:[],
				leftGroups:[],
				goodsGroups:[],
				selectedGoodsTypeIndex: 0,
				selectedGroupTypeIndex: 0,
				defaultCParentNo: null,
				defaultGroupTypeNo: null,
				selectedGoods: {
					type: Array,
					goods: [Object]
				},
				currentGoodsTypeNo: null,
				preRequestGoodsTypeNo: null,
				number_of_pages: 1,
				preventRepeatReuqest: false,
				showLoading: true
			}
		},
		created() {
			this.get_topData();
		}, 
		computed: {
			
		},
		mixins: [loadMore, getImgPath],
		watch: {
			defaultCParentNo: function() {
				if(this.defaultCParentNo != null){
					this.get_leftData({"cParentNo":this.defaultCParentNo});
				}
			},
			defaultGroupTypeNo: function() {
				if (this.defaultGroupTypeNo != null) {
					this.get_goodsData({"cGroupTypeNo":this.defaultGroupTypeNo, "Number_of_pages":this.number_of_pages, "cStoreNo":"000"});
				}
			}
		},
		methods: {
			...mapMutations([
				'ADD_CART', 'REDUCE_CART'
			]),
			get_topData(params) {
				if (!params){
        			params = {}
     			 }
     			this.$api.post('/Simple_online/Select_Top_Group', params, result => {
       			 	if(result.resultStatus === '1') {
       			 		this.topGroups = result.dDate;
       			 		this.defaultCParentNo = this.topGroups[0].cGroupTypeNo
       			 	}
      			})
			},
			get_leftData(params) {
				if(!params) {
					params = {}
				}
				this.$api.post('/Simple_online/Select_left_Group', params, result => {
					if(result.resultStatus === '1') {
       			 		this.leftGroups = result.dDate;
       			 		this.defaultGroupTypeNo = this.leftGroups[0].cGroupTypeNo;
       			 		this.currentGoodsTypeNo = this.leftGroups[0].cGroupTypeNo;
       			 	}
				})
			},
			get_goodsData(params) {
				if (!params) {
					params = {}
				}
				if (this.preRequestGoodsTypeNo !== this.currentGoodsTypeNo) {
					this.goodsGroups = [];
				}
				this.$api.post('/Simple_online/Select_right_goods', params, result => {
					console.log(result);
					if (result.resultStatus === '1') {
						this.goodsGroups = [...this.goodsGroups, ...result.dDate];
						this.hideLoading();
						this.preventRepeatReuqest = false;
					} else if (result.resultStatus === '0' && result.dDate.length == 0) {
						if (this.preRequestGoodsTypeNo !== this.currentGoodsTypeNo) {
							this.goodsGroups = [];
						}
						this.hideLoading();
						this.preventRepeatReuqest = false;
					}
					this.preRequestGoodsTypeNo = this.currentGoodsTypeNo
				})
			},
			loadMoreGoods() {
				if (this.preventRepeatReuqest) {
					return
				}
				this.preventRepeatReuqest = true;
				this.showLoading = true;
				this.number_of_pages = this.number_of_pages + 1;
				this.get_goodsData({"cGroupTypeNo":this.currentGoodsTypeNo, "Number_of_pages":this.number_of_pages , "cStoreNo":"000"});
				
			},
			/*
			* 选中小类方法
			*/
			goodsTypeDidClick(goodsType, index) {
				if (index == this.selectedGoodsTypeIndex) {
					return
				}
				this.showLoading = true;
				this.number_of_pages = 1;
				this.selectedGoodsTypeIndex = index;
				this.currentGoodsTypeNo = goodsType.cGroupTypeNo;
				this.get_goodsData({"cGroupTypeNo":goodsType.cGroupTypeNo, "Number_of_pages":this.number_of_pages , "cStoreNo":"000"});
			},
			/*
			*  选中大类方法
			*/
			groupTypeDidClicked(groupType, index) {
				if (index == this.selectedGroupTypeIndex) {
					return
				}
				this.showLoading = true;
				this.number_of_pages = 1;
				this.selectedGroupTypeIndex = index;
				/* 请求左侧数据 */
				this.get_leftData({"cParentNo":groupType.cGroupTypeNo});
				this.selectedGoodsTypeIndex = 0;
				let cGoodsTypeNo = this.leftGroups[0].cGroupTypeNo;
				this.currentGoodsTypeNo = this.leftGroups[0].cGroupTypeNo;
			},
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
			//开发环境与编译环境loading隐藏方式不同
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
			}
		},
		components: {
			footerGuide,
			headerGuide,
			loading
		}
	};
</script>

<style lang="scss" scoped>
@import '../../style/mixin';
$searchH: $headerGuideH*0.8;
	.category {
		display: flex;
		width: 100%;
		height: 100%;
		padding-bottom: $footerGuideH;
		padding-top: $headerGuideH;
		background: #fff;
		.searchWrapper {
			.search {
				i {
					display: block;
					margin-left: .4rem;
					height: $headerGuideH;
					line-height: $headerGuideH;
					font-size: 1.2rem;
			        color: white;
				}
			}
		}
		.leftWrapper {
			display: inline-block;
			width: 4rem;
			margin-top: 2rem;
			height: 100%;
			overflow: auto;
			overflow-x: hidden;
			background-color: #f2f3f5;
			@include sc(0.6rem, #232323);
			ul {
				display: block;
				width: 4rem;
				li {
					width: 4rem;
					text-align: center;
					height: 2rem;
					line-height: 2rem;
				}
				.selectedGoodsType-item {
					width: 4rem;
					background-color: white;
					border-left: .2rem solid $appMainColor;
					color: $appMainColor;
					font-size: .7rem
				}
			}
			
		}
		.rightWrapper {
			width: 12rem;
			height: 100%;
			display: flex;
			display: -webkit-flex;
			flex-direction: column;
			.topWrapper {
				vertical-align: top;
				height: 1.7rem;
				flex-shrink: 0;
				transform: translate(-1rem,0);
				ul {
					margin-top: .5rem;
					display: flex;
					li {
						flex: 1;
						height: 1.2rem;
						height: 1.2rem;
						display: inline-block;
						text-align: center;
						span {
							display: block;
							height: 1.2rem;
							line-height: 1.2rem;
						}
						@include sc(0.6rem, #666);
					}
					.selectedGroupType-item {
						background-color: $appMainColor;
						@include borderRadius(0.6rem);
						span {
							color: white;
						}
					}
				}
			}
			.goodsWrapper {
				flex: 1;
				overflow: auto;
				overflow-x: hidden;
				.goods-list {
					height: 100%;	
					.goods-item {
						position: relative;
						padding: .3rem;
						font-size: .65rem;
						display: flex;
						display: -webkit-flex;
						.icon {
							display: inline-block;
							flex-shrink: 0;
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
								display: inline-block;
								width: 100%;
								// white-space: nowrap;
								// text-overflow: ellipsis; 
								font-size: .7rem;
							}
							.onlinePrice {
								font-size: .6rem;
								color: rgb(243, 12, 12);
							}
							.normalPrice {
								margin-left: .5rem;
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
						.bottom-line {
							position: absolute;
							bottom: 0px;
							left: 10px;
							width: 100%;
							height: 1px;
							background-color: rgba(7, 17, 27, 0.1);
						}
					}
				}
			}
		}
	}
	

</style>


