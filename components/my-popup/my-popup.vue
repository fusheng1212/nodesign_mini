<!-- 底部弹窗组件 -->
<template>
	<view>
		<uni-popup :show="show" mode="bottom" position="bottom" @hidePopup="hide" :zIndex="zIndex">
			<view class="ticket-describe">
				<view class="ticket-describe-title">
					{{title}}
				</view>
				<uni-icons color="#313A5A" type="closeempty" size="22" class="ticket-describe-btn" @click="hide" />
				<scroll-view scroll-y="true" class="ticket-content">
					<view v-html="replaceDetail(content)" class="ticket-content-t"></view>
				 </scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "../uni-popup/uni-popup.vue"
	import utils from "@/utils/utils.js"
	export default {
		props: {
			/**
			 * 页面显示
			 */
			show: {
				type: Boolean,
				default: false
			},
			title: {
				type: String,
				default: '详细描述'
			},
			content: {
				default: '暂无描述'
			},
			zIndex: {
				default: 999
			}
		},
		components: {
			uniPopup
		},
		data() {
			return {
				
			}
		},
		methods: {
			replaceDetail: utils.replaceDetail,
			hide() {
				this.$emit('hidePopup');
			},
		}

	}
</script>

<style scoped lang="scss">
	.ticket-describe {
		border-radius: 28rpx 28rpx 0px 0px;
		background: #fff;
		position: relative;
		
		overflow-y: hidden;
		.ticket-describe-title {
			line-height: 100rpx;
			font-weight: 600;
		}

		.ticket-describe-btn {
			position: absolute;
			right: 30rpx;
			top: 30rpx;
		}
		.ticket-content{
			height: 700rpx;
			.ticket-content-t{
				margin: 0 30rpx 30rpx;
				font-size: 24rpx;
				color: #A7A8AC;
				white-space: pre-line;
				text-align: left;
			}
		}
	}
</style>
