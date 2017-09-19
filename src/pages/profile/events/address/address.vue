<template>
	<div class="addressWrapper">
		<headerGuide :title = "addressTitle" :isShowBack = 'true'></headerGuide>
		<div class="addressList">
			<ul>
				<li v-for = '(item,index) in addressList'>
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
					<div class="operateWrapper">
						<span class="edit addressBtn"  @click = "eidtAddress(item)"> 编辑 </span>
						<span class="delete addressBtn"  @click = "deleteAddress(item)"> 删除 </span>
						<div class="setDefault" @click="setDefault(item, index)" :class="{'defaultAdress-item':defaultAddressIndex==index}">
							<span class="checkbox-icon"><i class="dandan-uniE900"></i></span><span>设为默认地址</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="addAddressWrapper" @touchstart = "gotoAddress('operateAddress')">
			<span class="add"><i class="dandan-add"></i>&nbsp;添加新的收货地址</span>
		</div>
		<alertTipAlt v-if="showAlert" :alertText="alertText" @closeTip="closeTip()"></alertTipAlt>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import alertTipAlt from '../../../../components/common/alertTipAlt'
import {mapState, mapMutations} from 'vuex'

export default {
	components: {
		headerGuide,
		alertTipAlt
	}, 
	data() {
		return {
			addressTitle: "地址管理",
			addressList: [],
			showAlert: false,
			alertText: null,
			defaultAddressIndex: 0
		}
	},
	computed: {
		...mapState([
			'userInfo'
			])
	},
	created() {
		this.INIT_USERINFO_FROMLOCAL();
		if (this.userInfo.UserNo) {
			this.get_addressData({"UserNo": this.userInfo.UserNo});
		}
	}, 
	methods: {
		...mapMutations([
				'INIT_USERINFO_FROMLOCAL', 'SET_EDITING_USER_ADDRESS'
			]),
		get_addressData(params) {
			if (!params) {
				params = {};
			} 
			this.$api.post('/Simple_online/Select_User_Address', params, result => {
				if (result.resultStatus === '1') {
					this.addressList = result.dDate;
					console.log(this.addressList);
					this.addressList.forEach((address, index) => {
						let totalAdressInfo = address.Provincial + address.City + address.District + address.Detailaddress;
						this.$set(address, 'totalAdressInfo', totalAdressInfo);
						if (address.Default_fage == '1') {
							this.defaultAddressIndex = index;
						}
					});
				}
			});
		},
		gotoAddress(path) {
			if (path) {
				this.$router.push(path);
			}
		},
		eidtAddress(address) {
			console.log("address edit", address);
			this.SET_EDITING_USER_ADDRESS({editingUserAdress: address});
			this.$router.push('/operateAddress');
		},
		deleteAddress(address) {
			console.log("address", address);
			let params = null;
			if (address.AddressID) {
				params = {"AddressID": address.AddressID}
			} else {
				params = {};
			}
			this.$api.post('/Simple_online/Delete_Address', params , result => {
				if (result.resultStatus == '1') {
					this.showAlert = true;
					this.alertText = "删除成功!"
					if (this.userInfo.UserNo) {
						this.get_addressData({"UserNo": this.userInfo.UserNo});
					}
				}
			});
		},
		closeTip() {
			this.showAlert = false;
			this.alertText = null;
		},
		setDefault(address, index) {
			if (!address.AddressID) {
				return
			}
			this.$api.post("/Simple_online/Set_Address_Default", {"AddressID": address.AddressID, "UserNo": this.userInfo.UserNo}, result => {
				if (result.resultStatus == '1') {
					this.defaultAddressIndex = index;
				}
			});
		}
	}
}	

</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.addressWrapper {
		padding-top: $headerGuideH;
		padding-bottom: $footerGuideH;
		.addressList {
			ul {
				li{
					margin: 0 0 .5rem 0;
					background-color: #fff;
					
					.infoWrapper {
						padding: .3rem;
						@include border1px(rgba(7, 17, 27, 0.1));
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
					.operateWrapper {
						position: relative;
						padding: .3rem;
						// @include border1px(rgba(7, 17, 27, 0.3));
						display: flex;
						flex-direction: row-reverse;
						.addressBtn {
							font-size: .75rem;
							padding: .2rem 1rem;
							// background-color: #24b455;
							// border:1px solid #24b455;
							border: 1px solid rgba(7, 17, 27, 0.3);
							background-color: white;
							color: rgba(7, 17, 27, 0.7);
							margin-left: .8rem;
							@include borderRadius(5px);
						}
						.setDefault{
							flex: 1;
							.checkbox-icon {
								i {
									color: rgba(7, 17, 27, 0.3);
								}
							}
							span {
								margin-left: .5rem;
								font-size: 16px;
							}
						}
						.defaultAdress-item {
							.checkbox-icon {
								i {
									color: $appMainColor;
								}
							}
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
				i {
					vertical-align: center;
					font-size: .8rem;
					color: white;
				}
			}
		}
	}

</style>