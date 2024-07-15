<template>
	<view class="box flex-center-space flex-column" :style="{paddingTop: statusBarHeight}">
		<image src="../../static/bg1.png" mode="aspectFill" class="box-bg"></image>
		<image src="../../static/logo.png" mode="widthFix" class="box-logo"></image>
		<view class="box-text">N DESIGN·STUDIO·DALIAN</view>
	</view>
</template>

<script>
	import utils from '@/utils/utils.js'
	export default {
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight + 'px',
			}
		},
		onShow() {
			setTimeout(()=>{
				uni.navigateBack()
			},3000)
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.box{
	height: 100vh;
	position: relative;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #fff;
	padding-bottom: env(safe-area-inset-bottom);
	.box-bg{
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}
	.box-logo{
		margin-top: 330rpx;
		width: 300rpx;
		height: 320rpx;
	}
	.box-text{
		padding-bottom: 60rpx;
	}
}
</style>
