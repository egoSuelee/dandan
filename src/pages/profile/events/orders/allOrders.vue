<template>
	<div class="allOrdersWrapper">
		<headerGuide :title = "title">
			<span slot='search' class="searchWrapper">
				<span class="search"  @touchstart="gotoAddress('/profile')">
					<i class="dandan-uniE913"></i>
				</span>
			</span>
		</headerGuide>
		<div class="header-navgation">
			<ul class="nav-list">
				<li v-for = '(item,index) in header_navlist' class="nav-item" :class="{'selectedItem':index == selectedIndex}" @click='itemDidSelected(item,index)'>
						<span class="item-text">{{item.title}}</span>	
				</li>
			</ul>
			
		</div>
		<!-- 外联路由视图 -->
		<router-view class='routerViewWrapper'></router-view>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'

	export default {
		data() {
			return {
				header_navlist:[
					{title:'待付款', path: '/allOrders'}, 
					{title:'待发货', path: '/unpost'}, 
					{title:'待取货', path: '/unget'},
				 	{title:'待收货', path: '/unreceive'}, 
				 	{title:'已完成', path: '/completed'}],
				title: '我的全部订单',
			}
		},
		created() {
		},
		components: {
			headerGuide
		},
		computed: {
			...mapState([
				'selectedOrderTypeIndex'
			]),
			selectedIndex: function() {
				return this.selectedOrderTypeIndex;
			}
		},
		methods: {
			...mapMutations([
				'MODIFY_ORDER_SELECTEDTYPEINDEX'
				]),
			itemDidSelected(item, index) {
				this.MODIFY_ORDER_SELECTEDTYPEINDEX({selectedOrderTypeIndex: index});
				this.$router.push(item.path);
			},
			gotoAddress(path) {
				if (path) {
					this.$router.push(path);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
$navH: 2rem;
	.allOrdersWrapper{
		padding-top: $headerGuideH;
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
		.header-navgation {
			position: fixed;
			top: 1.95rem;
			left: 0;
			width: 100%;
			height: $navH;
			background: white;
			z-index: 99;
			.nav-list {
				display: flex;
				.nav-item {
					flex: 1;
					text-align: center;
					.item-text {
						display: block;
						height: $navH;
						line-height: $navH;
						font-size: .7rem;
					}
				}
				.selectedItem {
					position: relative;
					.item-text {
						color: $appMainColor;
					}
					&:after {
						position: absolute;
						bottom: 0;
						left: 0;
						height: .15rem;
						width: 100%;
						background-color:  $appMainColor;
						content: ' ';
					}
				}
			}
		}
		.routerViewWrapper {
			padding-top: 2rem;
		}
	}
</style>