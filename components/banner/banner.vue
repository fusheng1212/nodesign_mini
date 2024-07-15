<!-- 广告轮播图组件 -->
<template>
	<view class="swiper-banner">
		<swiper class="swiper" :current="current" :indicator-dots="false" @change="swiperChange" :autoplay="auto" circular :style="{height: bannerHeight +'rpx'}">
			<swiper-item v-for="(item,index) in list" :key="index" class="swiper-item" @click="toDetail(item)">
				<image :src="getHttps(item.fileUrlList? item.fileUrlList[0] : item.imgSrc)" class="swiper-banner-img" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="swiper-dots" :class="dots">
			<view v-for="(dot,index) in list" :class="['swiper-dots-item',{'swiper-dots-active':current == index}]"
			 :key="index">
			 <text v-if="dots == 'bottomRight2'">{{index+1}}/{{list.length}}</text>
			</view>
		</view>
		<slot />
	</view>
</template>

<script>
	import utils from '@/utils/utils.js'
	export default {
		props: {
			/**
			 * 页面显示
			 */
			list: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			bannerHeight:{
				type: [Number,String],
				default: 520
			},
			auto: {
				type: Boolean,
				default: false
			},
			dots: { //按钮位置
				type : String,
				default: 'center'
			}
		},
		data() {
			return {
				current: 0, //当前轮播图滑块的 index
			}
		},
		methods: {
			getHttps: utils.getHttps,
			// 轮播图切换事件
			swiperChange(event) {
				this.current = event.detail.current
				this.$emit('changeCurrent',event.detail.current)
			},
			toDetail(item) {
				if(!item.urlPath){
					return 
				}
				if (item.pathType == 2) { //链接
					item.urlPath && uni.navigateTo({
						url: '/pages/webView/webView?url=' + encodeURIComponent(item.urlPath)
					})
				}
				if (item.pathType == 1) { //页面路径
					item.urlPath && uni.navigateTo({
						url: (item.urlPath[0] == '/' ? '' : '/') +  item.urlPath
					})
				}
				if (item.pathType == 3) { //外部小程序
					item.urlPath && uni.navigateToMiniProgram({
						appId: item.appid,
						path: item.urlPath,
						success(res) {
							// 打开成功
						}
					})
				}
			},
			setIndex(index){
				this.current = index
			}
		}
	
	}
</script>

<style scoped lang="scss">
	.swiper-banner {
		position: relative;
		.swiper {
			z-index: 1;
			.swiper-item .swiper-banner-img {
				width: 100%;
				height: 100%;
			}
		}
	
		.swiper-dots {
			position: absolute;
			z-index: 2;
			display: flex;
			justify-content: center;
			.swiper-dots-item {
				width: 14rpx;
				height: 14rpx;
				background: #CCCCCC;
				border-radius: 14rpx;
				margin: 0 8rpx;
			}
	
			.swiper-dots-active {
				background: #A8A8A8;
			}
		}
		.center{
			bottom: 106rpx;
			left: 0;
			right: 0;
		}
		.bottomRight{
			bottom: 32rpx;
			right: 33rpx;
		}
		.bottomCenter{
			bottom: 10rpx;
			left: 0;
			right: 0;
		}
		.bottomCenter2{
			bottom: 50rpx;
			left: 0;
			right: 0;
		}
		.bottomCenter3{
			bottom: 190rpx;
			left: 0;
			right: 0;
		}
		.bottomRight2{
			bottom: 50rpx;
			right: 33rpx;
			.swiper-dots-item{
				width: 100rpx;
				line-height: 40rpx;
				height: 40rpx;
				background: rgba(0, 0, 0, 0.4);
				border-radius: 20rpx;
				text-align: center;
				color: #fff;
				font-size: 24rpx;
				display: none;
				&.swiper-dots-active {
					display: block
				}
			}
		}
	}
</style>
