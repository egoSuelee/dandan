<template>
	<div class="bmkAddress">
		<headerGuide :title="headerTitle" :isShowBack='isShowBack'></headerGuide>
		<div class="bmkAddressWrapper">
			<!-- <p>百度地图</p> -->
			<div id="bdMap" class="bdMap">
			</div>
		</div>
		<div class="resultWrapper">
			<ul class="result-list">
				<li class="result-item" v-for = "item in validAddressList" @click = "adderssItemDidSelect(item)">
					<div class="iconWrapper">
						<span class="icon"><i class="dandan-map"></i></span>
					</div>
					<div class="addressInfoWrapper">
						<div class="address">
							<span class="title">{{item.title}}</span>
						</div>
						<div class="detailAddress">
							<span class="ellipsis">{{item.address}}</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
import {mapState, mapMutations} from 'vuex'


	export default {
		data() {
			return {
				isShowBack: true,
				map:null,
				center: {},
				zoomLevel: 14, //缩放级别 3-19
				validAddressList:[],
			}
		},
		props: [],
		components: {
			headerGuide
		},
		mounted() {
			this.initCenter();
			this.initBaiduMap();
			this.addCircleOverlay();
		},
		computed: {
			...mapState([
				'currentServiceStore'
			]),
			headerTitle: function() {
				if (this.currentServiceStore.cStoreNo) {
					return this.currentServiceStore.city;
				} else {
					return '选择配送地址';
				}
			},
			storeLocation: function() {
				if (this.currentServiceStore.cStoreNo) {
					return {lng:parseFloat(this.currentServiceStore.fLont), lat: parseFloat(this.currentServiceStore.fLant)};
				} else {
					return {lng:114.3162001, lat: 30.58108413};
				}
			}
		},
		methods: {
			...mapMutations([
				'SET_CURRENT_USER_ADDRESS'
				]),
			initCenter() {
				if (this.currentServiceStore.cStoreNo) {
					this.center = {lng:parseFloat(this.currentServiceStore.fLont), lat: parseFloat(this.currentServiceStore.fLant)};
				} else {
					return {lng:114.3162001, lat: 30.58108413};
				}
			},
			initBaiduMap() {
					var map = new BMap.Map("bdMap");
					this.map = map;   
					map.centerAndZoom(new BMap.Point(this.center.lng,this.center.lat), this.zoomLevel);  
					//map.addControl(new BMap.MapTypeControl());   
					map.enableScrollWheelZoom(true);
			},
			addCircleOverlay() {
				if (!this.map) {
					return
				} 
				var point = new BMap.Point(this.storeLocation.lng,this.storeLocation.lat);
				var myIcon = new BMap.Icon("/static/shop_icon.png", new BMap.Size(30, 30));
				var storemarker = new BMap.Marker(point, {icon: myIcon}); 
				var desMaker = new BMap.Marker(point);
				desMaker.enableDragging(); 
				var that = this;
				var circle = new BMap.Circle(point,1500,{fillColor:"rgba(65, 148, 229, .6)", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3, strokeStyle: "solid", enableEditing:false});

				desMaker.addEventListener("dragend", function(e){    
				 	// alert("当前位置：" + e.point.lng + ", " + e.point.lat);
				 	var options = {
						    onSearchComplete: function(results){      
					          if (local.getStatus() == BMAP_STATUS_SUCCESS){
					          	console.log(results);
					          	let resultsSet = results[0].vr;
					          	console.log("resultsSet",resultsSet);
					          	let filterResult = resultsSet.filter((element) => {
					          		return BMapLib.GeoUtils.isPointInCircle(element.point, circle);
					          	});
					          	that.validAddressList = filterResult;
					          }      
					      }      
					 }; 
				 	 var local =  new BMap.LocalSearch(this.map, options);
				 	 local.setPageCapacity(30);
				 	 // var searchKeys = ['小区','写字楼', '餐馆', '学校'];
				 	 var searchKeys = ['住宅小区'];
				 	 local.searchNearby(searchKeys, e.point, 1500);
				})  
				
				this.map.addOverlay(circle);
				this.map.addOverlay(storemarker);
				this.map.addOverlay(desMaker);
			},
			adderssItemDidSelect(address) {
				this.SET_CURRENT_USER_ADDRESS({currentUserAddress: address});
				this.$router.go(-1);
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
.bmkAddressWrapper {
	
	position: fixed;
	top: $headerGuideH;
	left: 0;
	width: 100%;
	height: 16rem;
	z-index: 100;
	#bdMap {
		width: 100%;
		height: 16rem;
	}
}
.resultWrapper {
	padding-top: 18rem;
	overflow: auto;
	height: 100%;
	.result-list {
		.result-item {
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
							color: $appMainColor;
						}
					}
				}
				.addressInfoWrapper {
					display: flex;
					flex: 1;
					flex-direction: column;
					height: 3rem;
					.address {
						display: flex;
						flex: 1;
						padding: 0 .5rem;
						font-size: 18px;
						.title {
							flex: 2;
							text-align: left;
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
	
</style>










