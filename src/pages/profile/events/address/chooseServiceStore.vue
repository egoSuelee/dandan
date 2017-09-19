<template>
	<div class="chooseServiceStoreWrapper">
		<headerGuide :title = "pageTitle" isShowBack = 'true'></headerGuide>
		<div class="contentWrapper">
			<ul class="store-list">
				<li v-for = 'item in serviceStoreList' class="store-item" @touchstart = "didSelectStore(item)">
					<div class="iconWrapper">
						<span class="icon"><i class="dandan-uniE915"></i></span>
					</div>
					<div class="stroeInfoWrapper">
						<div class="store">
							<span class="storename">{{item.cStoreName}}</span>
							<span class="tel">{{item.Tel}}</span>
						</div>
						<div class="detailAddress">
							<span class="ellipsis">{{item.Address}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<loading v-if="showLoading"></loading>
	</div>
</template>
<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapMutations} from 'vuex'
import loading from '../../../../components/common/loading'

	export default {
		data() {
			return {
				pageTitle: "选择服务门店",
				serviceStoreList:[],
				showLoading: true
			}
		},
		created() {
			this.get_serviceStoreList({});
		},
		methods: {
			...mapMutations([
				'SET_CURRENT_SERVICE_STORE'
				]),
			get_serviceStoreList(params) {
				if (!params) {
					params = {}
				}
				this.$api.post("/Simple_online/Select_All_Store_Address", params, result => {
					if (result.resultStatus == '1') {
						this.serviceStoreList = result.dDate;
						this.showLoading = false;
						console.log(this.serviceStoreList);
					} else {
						this.showLoading = false;
					}
				});
			},
			didSelectStore(store) {
				if (store) {
					console.log(store);
					this.SET_CURRENT_SERVICE_STORE({currentServiceStore: store});
					this.$router.go(-1);
				}
			} 
		},
		components: {
			headerGuide,
			loading
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../../../style/mixin';
	.chooseServiceStoreWrapper {
		padding-top: 1.95rem;
		.contentWrapper {
			.store-list {
				.store-item {
					display: flex;
					height: 3rem;
					@include border1px(rgba(7, 17, 27, 0.1));
					background-color: white;
					.iconWrapper {
						width: 2.5rem;
						height: 100%;
						position: relative;
						.icon {
							@include center;
							display: inline-block;
							width: 1.5rem;
							height: 1.5rem;
							i {
								font-size: 1.5rem;
								// color: rgba(7, 17, 27, .2);
								color: $appMainColor;
							}
						}
					}
					.stroeInfoWrapper {
						display: flex;
						flex: 1;
						flex-direction: column;
						height: 3rem;
						.store {
							display: flex;
							flex: 1;
							padding: 0 .5rem;
							font-size: 18px;
							.storename {
								flex: 2;
								text-align: left;
								height: 100%;
								line-height: 1.5rem;
							}
							.tel {
								flex: 1;
								text-align: right;
								height: 100%;
								line-height: 1.5rem;
							}
						}
						.detailAddress {
							padding: 0 .5rem;
							font-size: 14px;
							flex: 1;
							span {
								display: inline-block;
								height: 100%;
								width: 12rem;
								line-height: 1.5rem;
							}
						}
					}
				}
			}
		}
	}

</style>







