<template>
	<div class="unpayWrapper">
		<div class="contentWrapper">
			<ul v-for= 'order in orderList' class="order-list">
				<li class="order-item">
					<div class="titleWrapper ellipsis">
						<b>订单编号&nbsp;</b><i>{{order.cSheetno}}</i>
					</div>
					
					<goodsList :goodsList = 'order.details_list' :showRealGoodsNum = 'false' :showsummaryOperate = 'true' :summaryInfo = "{'allMoney': order.All_Money, 'freight': order.Send_Money}" :btnList = "sortedBtnList"></goodsList>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import goodsList from '../../../../components/common/goodsList'
	export default {
		data() {
			return {
				orderList:[],
				btnList: [
					{
						title: "联系卖家",
						type: "connect",
						isSpecial: false
					},
					{
						title: "取消订单",
						type: "cancel",
						isSpecial: false
					},
					{
						title: "立即付款",
						type: "pay",
						isSpecial: true
					}]
			}
		}, 
		created() {
			this.get_unpayOrder({"UserNo": "13125022222","fage":"0","Number_of_pages":"1","cStoreNo":"000", "Send_Way":"2"});
		},
		mounted() {

		}, 
		methods: {
			get_unpayOrder(params) {
				if (!params) {
					return;
				}
				this.$api.post('/Simple_online/Select_order', params, result => {
					if (result.resultStatus == '1') {
						this.orderList = result.array;
						console.log(this.orderList);
					}
				});
			}
		},
		components: {
			goodsList
		},
		computed: {
			sortedBtnList: function() {
				return this.btnList.reverse();
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.unpayWrapper {
		.contentWrapper {
			.order-list {
				.order-item {
					margin-bottom: .5rem;
					background-color: white;
					.titleWrapper {
						padding: .3rem .2rem;
						font-size: .7rem;
						@include border1px(rgba(7, 17, 27, 0.2));
						b {
							vertical-align: top;
						}
						i {
							margin-left: .3rem;
						}
					}
				}
			}
		}
	}
</style>















