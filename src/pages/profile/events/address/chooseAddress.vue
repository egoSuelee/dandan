<template>
	<div class="chooseAddressWrapper">
		<headerGuide :title = "addressTitle" :isShowBack = 'true'></headerGuide>
		<div class="addressList">
			<ul>
				<li v-for = 'item in addressList' @touchstart = "didSelectUserAddress(item)">
					<div class="infoWrapper">
						<div class="user">
							<span class="label">公司</span>
							<span class="username ellipsis">{{item.UserName}}</span>
							<span class="tel">{{item.Tel}}</span>
						</div>
						<div class="detailAddress">
							<span>{{item.totalAdressInfo}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="addAddressWrapper" @touchstart = "gotoAddress('operateAddress')">
			<span class="add"><i class="dandan-add"></i>&nbsp;添加新的收货地址</span>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapMutations} from 'vuex'
export default {
	components: {
		headerGuide
	}, 
	data() {
		return {
			addressTitle: "地址管理",
			addressList: []
		}
	},
	created() {
		this.get_addressData({"UserNo": "13125022222"});
	}, 
	methods: {
		...mapMutations([
			'SET_CURRENT_USER_ADDRESS'
			]),
		get_addressData(params) {
			if (!params) {
				params = {};
			} 
			this.$api.post('/Simple_online/Select_User_Address', params, result => {
				if (result.resultStatus === '1') {
					this.addressList = result.dDate;
					
					this.addressList.forEach((address, index) => {
						let totalAdressInfo = address.Provincial + address.City + address.District + address.Detailaddress;
						this.$set(address, 'totalAdressInfo', totalAdressInfo);
					});
					console.log(this.addressList);
				}
			});
		},
		gotoAddress(path) {
			if (path) {
				this.$router.push(path);
			}
		},
		didSelectUserAddress(userAddress) {
			if (userAddress) {
				this.SET_CURRENT_USER_ADDRESS({currentUserAddress: userAddress});
				this.$router.go(-1);
			}
		}
	}
}	

</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.chooseAddressWrapper {
		padding-top: $headerGuideH;
		padding-bottom: $footerGuideH;
		.addressList {
			ul {
				li{
					margin: 0 0 .5rem 0;
					background-color: #fff;
					
					.infoWrapper {
						padding: .3rem;
						.user {
							display: flex;
							margin:.3rem 0rem .3rem 0rem;
							font-size: 18px;
							height: 1.2rem;
							.label {
								font-size: .7rem;
								padding: 0rem .5rem 0rem .5rem;
								background-color: $blue;
								color: white;
								@include borderRadius(.1rem);
								height: 100%;
								line-height: 1.2rem;
							}
							.username {
								flex: 1;
								margin-left: .3rem;
								font-weight: bold;
							}
							.tel {
								flex: 1;
								margin-right: .3rem;
								text-align: right;
							}
						}
						.detailAddress {
							margin:.3rem 0rem .3rem 0rem;
							padding-left: .3rem;
							font-size: 15px;
						}
					}
				}
			}
		}
		.addAddressWrapper {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1.95rem;
			background-color: $appMainColor;
			text-align: center;
			span {
				font-size: .8rem;
				color: white;
				height: 1.95rem;
				line-height: 1.95rem;
				vertical-align: top;
				i {
					height: 1.95rem;
					line-height: 1.95rem;
					font-size: .8rem;
					color: white;
				}
			}
		}
	}

</style>