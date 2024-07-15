<template>
	<view class="box">
		<image src="../../static/logo3.png" mode="widthFix" class="box-top"></image>
		<image src="../../static/logo2.png" mode="widthFix" class="box-top2"></image>
		<view class="flex-center-center">
			<view class="box-item"  @click="jumpFor('/pages/aboutUs/aboutUs')">
				<image src="../../static/images/index_1.png" mode="heightFix"></image>
				<view class="box-item-text">关于我们</view>
			</view>
			<view class="box-item" @click="jumpFor('/pages/project/project')">
				<image src="../../static/images/index_2.png" mode="heightFix"></image>
				<view class="box-item-text">往期案例</view>
			</view>
		</view>
		<view class="box-view" @click="jumpFor('/pages/my/my')">
			<image src="../../static/images/index_3.png" mode="widthFix"></image>
			<view class="box-view-text">查看我的家</view>
		</view>
		
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/new.vue'
	import utils from '@/utils/utils.js'
	export default {
		components:{
			tabBar
		},
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			jumpFor: utils.jumpFor
		}
	}
</script>

<style scoped lang="scss">
	.box{
		text-align: center;
		padding-bottom: env(safe-area-inset-bottom);
		overflow: hidden;
		.box-top{
			display: block;
			width: 296rpx;
			height: 302rpx;
			margin: 52rpx auto 0;
		}
		.box-top2{
			display: block;
			width: 296rpx;
			height: 90rpx;
			margin: 0rpx auto 68rpx;
		}
		.box-view{
			background: #fff;
			border-radius: 30rpx;
			margin: 52rpx 40rpx 0;
			font-size: 36rpx;
			color: rgba(66, 66, 66, 1);
			text-align: center;
			padding: 0rpx 0 25rpx;
			image{
				width: 410rpx;
				height: 288rpx;
			}
			.box-view-text{
				margin-top: 10rpx;
			}
		}
		.box-item{
			padding: 20rpx 40rpx;
			background: #fff;
			border-radius: 30rpx;
			margin: 0 30rpx;
			box-sizing: border-box;
			font-size: 32rpx;
			position: relative;
			color: rgba(66, 66, 66, 1);
			width: 308rpx;
			image{
				width: 228rpx;
				height: 185rpx;
			}
			.box-item-text{
				text-align: center;
			}
		}
	}
</style>
