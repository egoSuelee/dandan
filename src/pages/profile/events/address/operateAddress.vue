<template>
	<div class="operateAddressWrapper">
		<headerGuide :title = "pageTitle" :isShowBack = 'true'></headerGuide>
		<div class="formWrapper">
			<ul class="address-list">
				<li v-for = '(item,index) in titleArray' class="address-item" @click="didClicked(item)">
					<span class="title">{{item.title}}</span>
					<span class="choose">
					
						<input v-show = 'item.isNeedTextField' type="text" class="formValue"  v-model = 'item.value' :placeholder="appendPlaceholder(item.title)" 	/>
						<span  v-show = '!item.isNeedTextField' class="formValue" :class="{'isSet-item':item.isSet}">{{item.type==1?serviceStoreTitle:userAddressTitle}}</span>
					</span>
					<span v-show = '!item.isNeedTextField' class="more-icon"><i class="dandan--"></i></span>
				</li>
				<li class="labelWrapper address-item">
					<span class="title">标签</span>
					<div class="labels">
						<span class="label-item" v-for = '(label, index) in labelArray' @click = "labelDidSelect(index)">
							<span class="item" :class = "{'selected-label-item': index == selectedLabelIndex}">{{label}}</span>
						</span>
					</div>
				</li>
				<li class="commintBtnWrapper address-item">
					<div class="commit" @click = "didCommitNewAddress()">
						<span class="commit-text"><i class="dandan-add"></i>&nbsp;{{btnTitle}}</span>
					</div>
				</li>
			</ul>
		</div>
		<alertTip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alertTip>
	</div>
</template>

<script>

var state = {
	edit: 0,
	add: 1
};

import headerGuide from '../../../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'
import alertTip from '../../../../components/common/alertTip'

	export default {
		data() {
			return {
				titleArray: [
				{
					title: '收货人', 
					isNeedTextField: true,
					isSet: false,
					value: null
				},
			 	{
			 		title: '联系电话',
			 		isNeedTextField: true,
			 		isSet: false, 
			 		value: null
			 	}, 
			 	{
			 		title: '服务门店',
			 		isNeedTextField: false,
			 		type: 1,
			 		isSet: false,
			 		value: null //选择服务门店
			 	}, 
			 	{
			 		title: '小区/大厦',
			 		isNeedTextField: false,
			 		type: 2,
			 		isSet: false,
			 		value: null //选择小区位置
			 	}, 
			 	{
			 		title: '门牌号',
			 		isNeedTextField: true,
			 		isSet: false,
			 		value: null 
			 	}],
			 	labelArray: ['公司', '家', '学校', '其他'],
			 	selectedLabelIndex: null,
			 	showAlert: false,
			 	alertText: null
			}
		}, 
		created() {
			// this.clearCurrentAdderssInfo();
			this.INIT_USERINFO_FROMLOCAL();
			this.initValueIfEdit();
			this.initTitleArrayFromVuex();
			this.testPrint();
		},
		watch: {
			UserName: function() {
				
				this.SET_CURRENT_ADDRESS_USER_NAME({currentUserName: this.titleArray[0].value});
				
			},
			UserTel: function () {
				this.SET_CURRENT_ADDRESS_USER_TEL({currentUserTel: this.titleArray[1].value});
			},
			UserAdressDetails: function() {
				this.SET_CURRENT_ADDRESS_USER_DETAIL({currentUserAddressDetails: this.titleArray[4].value});
			}
		},
		computed: {
			...mapState([
				'currentServiceStore', 'currentUserAddress', 'userInfo', 'currentUserName',
				'currentUserTel', 'currentUserAddressDetails', 'editingUserAdress'
				]),
			pageTitle: function() {
				if (this.editingUserAdress) {
					return "编辑我的地址"
				} else {
					return "新增收货地址"
				}
			},
			btnTitle: function() {
				if (this.editingUserAdress) {
					return "保存我的地址"
				} else {
					return "保存新增地址"
				}
			},
			UserName: function() {
				return this.titleArray[0].value;
			},
			UserTel: function() {
				return this.titleArray[1].value;
			},
			UserAdressDetails: function() {
				return this.titleArray[4].value
			},
			serviceStore: function() {
				if (this.currentServiceStore.cStoreNo) {
					return this.currentServiceStore;
				} else {
					return {};
				}
			},
			userNo: function() {
				if (this.userInfo.UserNo) {
					return this.userInfo.UserNo;
				}
			},
			serviceStoreTitle: function() {
				if (this.serviceStore.cStoreNo) {
					this.titleArray[2].isSet = true;
					this.titleArray[2].value = this.serviceStore.cStoreName;
					return this.serviceStore.cStoreName;
				} else {
					this.titleArray[2].isSet = false;
					return '点击选择服务门店';
				}
			},
			userAddress: function() {
				if (this.currentUserAddress.uid) {
					this.titleArray[3].isSet = true;
					this.titleArray[3].value = this.currentUserAddress.title
					return this.currentUserAddress;
				} else {
					this.titleArray[3].isSet = false;
					return {};
				}
			},
			userAddressTitle: function() {
				if (this.userAddress.uid) {
					return this.userAddress.title;
				} else {
					return '点击选择小区/大厦';
				}
			}
		},
		methods: {
			...mapMutations([
				'SET_CURRENT_SERVICE_STORE', 'SET_CURRENT_USER_ADDRESS', 'INIT_USERINFO_FROMLOCAL', 'SET_CURRENT_ADDRESS_USER_NAME', 'SET_CURRENT_ADDRESS_USER_TEL', 'SET_CURRENT_ADDRESS_USER_DETAIL'
				]),
			initTitleArrayFromVuex() {
				this.titleArray[0].value = this.currentUserName;
				this.titleArray[1].value = this.currentUserTel;
				this.titleArray[4].value = this.currentUserAddressDetails;
			},
			initValueIfEdit() {
				if (this.editingUserAdress) {
					this.SET_CURRENT_ADDRESS_USER_NAME({currentUserName: this.editingUserAdress.UserName});
					this.SET_CURRENT_ADDRESS_USER_TEL({currentUserTel: this.editingUserAdress.Tel});
					this.SET_CURRENT_ADDRESS_USER_DETAIL({currentUserAddressDetails: this.editingUserAdress.Detailaddress});
					// this.SET_CURRENT_SERVICE_STORE({currentServiceStore: editingUserAdress});
					// this.SET_CURRENT_USER_ADDRESS({currentUserAddress: editingUserAdress});
				}
			},
			didClicked(item) {
				if (!item.type) {
					return
				} 
				switch(item.type) {
					case 1:
						this.$router.push('/chooseServiceStore');
						break; 
					case 2: 
						this.pushto_address();
						break;
				}
			},
			pushto_address() {
				if (this.currentServiceStore.cStoreNo) {
					console.log(this.currentServiceStore.cStoreNo);
					this.$router.push('/bmkAddress');
				} else {
					this.showAlert = true;
                    this.alertText = '请添加一个服务门店地址';
				}
			},
			clearCurrentAdderssInfo() {
				let store = {};
				this.SET_CURRENT_SERVICE_STORE({currentServiceStore: store});
				this.SET_CURRENT_USER_ADDRESS({currentUserAddress: userAddress})
				console.log(this.currentServiceStore);
			},
			testPrint() {
				console.log("testPrintData---");
				console.log("titleArray", this.titleArray);
			},
			labelDidSelect(index) {
				if (this.selectedLabelIndex == index) {
					return 
				} else {
					this.selectedLabelIndex = index;
				}
			},
			appendPlaceholder(title) {
				return '请输入' + title;
			},
			didCommitNewAddress() {
				let nullForms = this.titleArray.filter((element) => {
					return element.value == null;
				});
				if (nullForms.length !== 0) {
					this.showAlert = true;
					this.alertText = nullForms[0].title + "不能为空";
					return
				}
				
				var label = this.selectedLabelIndex == null ? "其他" : this.labelArray[this.selectedLabelIndex];

				let params = {"UserNo": this.userNo, "Tel": this.titleArray[1].value, "UserName": this.titleArray[0].value, "Provincial": this.currentUserAddress.province, "City": this.currentUserAddress.city, "District": this.currentUserAddress.title, "Detailaddress": this.currentUserAddress.address + this.titleArray[4].value, "Default_fage": "0", "fLont": this.currentUserAddress.point.lng, "fLant": this.currentUserAddress.point.lat, "cStoreNo": this.serviceStore.cStoreNo, "label": label};
				console.log("params", params);
				this.$api.post("/Simple_online/Add_User_Address", params, result => {
					if (result.resultStatus == '1') {
						this.$router.push('/address');
					}
				});
			}
		},
		components: {
			headerGuide,
			alertTip
		}
	}

</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.operateAddressWrapper {
		padding-top: 2.7rem;
		.formWrapper {
			.address-list {
				background-color: white;
				padding: .5rem 0;
				.address-item {
					padding-bottom: .3rem;
					display: flex;
					height: 1.8rem;
					@include border1px(rgba(7, 17, 27, 0.1));
					.title {
						display: inline-block;
						width: 4rem;
						height: 1.8rem;
						font-size: 16px;
						text-align: center;
						line-height: 1.8rem;
					}
					.choose {
						flex: 1;
						height: 1.8rem;
						.formValue {
							display: inline-block;
							width: 100%;
							height: 1.8rem;
							font-size: .7rem;
							line-height: 1.8rem;
							color: rgba(7, 17, 27, 1);
						}
						.isSet-item {
							color: rgba(7, 17, 27, .8);
						}
					}
					.more-icon {
						position: relative;
						display: inline-block;
						height: 1.8rem;
						text-align: center;
						padding: 0.5rem .3rem;
						i {
							display: inline-block;
							color: rgba(7, 17, 27, 0.4);
							font-size: .8rem;
							vertical-align: top;
						}
					}
				}
				.labelWrapper {
					.labels {
						display: flex;
						flex: 1;
						text-align: center;
						.label-item {
							display: inline-block;
							flex: 1;
							height: 1.8rem;
							line-height: 1.8rem;
							font-size: .66rem;
							.item {
								// background-color: #e2e2e2;
								border: 1px solid #e2e2e2;
								padding: .1rem .4rem;
								color: rgba(7, 17, 27, 0.5);
								@include borderRadius(.2rem);
							}
							.selected-label-item {
								color: white;
								border: 1px solid #298ae8;
								background-color: $appMainColor;
							}
						}

					}
				}
				.commintBtnWrapper {
					height: 2.4rem;
					@include border1px(rgba(7, 17, 27, 0));
					.commit {
						margin: .5rem auto;
						height: 1.8rem;
						width: 60%;
						background-color: white;
						font-size: .8rem;
						text-align: center;
						@include borderRadius(.1rem);
						background-color: $appMainColor;
						.commit-text {
							height: 1.8rem;
							line-height: 1.8rem;
							color: white;
							i {
								font-size: 0.8rem;
								color: white;
							}
						}
					}
				}
			}
		}
	}

</style>