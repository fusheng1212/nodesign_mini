<template>
	<view class="box">
		<!-- 顶部展示区 -->
		<uniNavBar fixed="true" statusBar="true" backgroundColor="transparent" leftIcon="back" color="#7F8592"
			:scrollTopC="scrollTopM" />
		<view class="box-top" :style="{paddingTop: statusBarHeight + 'px'}">
			<image src="../../static/logo2.png" mode="widthFix"></image>
		</view>
		<view class="box-content flex-column flex-center-center" :style="{marginTop: statusBarHeight + 'px'}">
			<image src="../../static/images/about_4.png" mode="widthFix" class="box-content-top"></image>
			<view class="box-content-text">
				关于不作设计
			</view>
			<view class="box-banner">
				<Banner :list="bannerList" :bannerHeight="1060" dots="bottomCenter" />
			</view>
			<view class="box-content-bottom">
				<image src="../../static/logo3.png" mode="widthFix"></image>
			</view>
			
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-nav-bar/uni-nav-bar.vue'
	import Banner from "@/components/banner/banner.vue"
	export default {
		components:{
			uniNavBar,
			Banner
		},
		data() {
			return {
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight || 0,
				bannerList:[{
					imgSrc: '../../static/images/about_1.png'
				},{
					imgSrc: '../../static/images/about_2.png'
				},{
					imgSrc: '../../static/images/about_3.png'
				}]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
.box{
	position: relative;
	padding-bottom: env(safe-area-inset-bottom);
	overflow: hidden;
	.box-top{
		position: fixed;
		z-index: -1;
		top: 160rpx;
		left: 0;
		right: 0;
		text-align: center;
		image{
			width: 300rpx;
			height: 300rpx;
		}
	}
	.box-content{
		padding-top: 535rpx;
		position: relative;
		z-index: 9;
		.box-content-top{
			width: 750rpx;
			height: 200rpx;
		}
		.box-content-text{
			width: 100%;
			text-align: center;
			color: #383838;
			font-size: 50rpx;
			font-weight: bold;
			line-height: 120rpx;
			background: #fff;
		}
		.box-banner{
			background: #fff;
			width: 750rpx;
		}
		.box-content-bottom{
			width: 100%;
			background: #fff;
			text-align: center;
			image{
				width: 80rpx;
				height: 80rpx;
			}
		}
	}
}
</style>
