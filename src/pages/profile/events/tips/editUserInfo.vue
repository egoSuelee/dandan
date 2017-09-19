<template>
	<div class="editUserInfoWrapper">
		<headerGuide :title = "title" :isShowBack = 'isShowBack'></headerGuide>
		<div class="contentWrapper">
			<ul class="info-list">
				<li v-for="item in userInfoList" class="info-item">
					<span class="label">{{item.title}}</span>
					<span class="more-icon">
						<i class="dandan-- more-icon-text"></i>
					</span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import headerGuide from '../../../../components/header/headerGuide'
export default {
	data() {
		return {
			title: "编辑我的信息",
			isShowBack: true,
			feedbackContent: null,
			userInfoList: [{title:"头像"}, {title:"昵称"}, {title: "邮箱"}, {title:"手机号码"}]
		}
	},
	methods: {
		
	},
	components: {
		headerGuide
	}
}
</script>

<style lang="scss" scoped>
@import '../../../../style/mixin';
	.editUserInfoWrapper {
		padding-top: $headerGuideH;
		.contentWrapper {
			.info-list {
				.info-item {
					display: flex;
					height: 2rem;
					background: white;
					@include border1px(rgba(7, 17, 27, .3));
					font-size: .85rem;
					.label {
						padding-left: .5rem;
						flex: 1;
						display: inline-block;
						height: 2rem;
						line-height: 2rem;
					}
					.more-icon {
						width: 2rem;
						display: inline-block;
						vertical-align: top;
						height: 2rem;
						text-align: center;
						line-height: 2rem;
					}
				}
			}
		}
	}
</style>