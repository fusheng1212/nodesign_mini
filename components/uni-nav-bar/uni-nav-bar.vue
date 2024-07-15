<!-- 自定义顶部导航组件 -->
<template>
	<view class="uni-navbar">
		<view :class="{ 'uni-navbar--fixed': fixed, 'uni-navbar--shadow': shadow, 'uni-navbar--border': border }" :style="{ 'background-color': backgroundColor }"
		 class="uni-navbar__content">
			<status-bar v-if="statusBar" />
			<view :style="{ color: color,backgroundColor: backgroundColor }" class="uni-navbar__header uni-navbar__content_view">
				<view @tap="onClickLeft" class="uni-navbar__header-btns uni-navbar__header-btns-left uni-navbar__content_view" :style="{width: contentType == 1?'150rpx': '20rpx'}" v-if="contentType == 1 || leftIcon !='none'">
					<view class="uni-navbar__content_view" v-if="leftIcon !='none'">
						<!-- #ifndef MP-ALIPAY -->
						<uni-icons :color="scrollTopC>50? '#313A5A':color" :type="leftIcon" size="24" v-if="leftIcon == 'gear'" style="margin-left: 20rpx;" />
						<uni-icons :color="scrollTopC>50? '#313A5A':color" :type="leftIcon" size="24" v-else />
						<!-- #endif -->
					</view>
					<view :class="{ 'uni-navbar-btn-icon-left': leftIcon =='none' }" class="uni-navbar-btn-text uni-navbar__content_view"
					 v-if="leftText.length">
						<text class="uni-text-import" :style="{ color: color, fontSize: '14px' }">{{ leftText }}</text>
					</view>
					<slot name="left" />
				</view>
				<view class="uni-navbar__header-container uni-navbar__content_view" @tap="onClickTitle">
					<view class="uni-navbar__header-container-inner uni-navbar__content_view" v-if="title.length && contentType == 1">
						<text class="uni-nav-bar-text uni-text-import font-limit" :style="{color: color }">{{ title }}</text>
					</view>
					<view class="uni-navbar__header-container-inner2 uni-navbar__content_view" v-else-if="contentType == 2">
						<view class="search-box" :style="{background: scrollTopC>50 ? '#ddd':'rgba(242, 244, 244, 0.5)'}" @click.stop="goSearch">
							<image src="https://image.xisland.cn/newIcon/search.png" class="search-box-img"></image>
							{{placeholder}}
						</view>
					</view>
					<!-- 标题插槽 -->
					<slot />
				</view>
				<!-- #ifndef H5 -->
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" class="uni-navbar__header-btns uni-navbar__content_view">
				</view>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view :class="title.length ? 'uni-navbar__header-btns-right' : ''" class="uni-navbar__header-btns uni-navbar__content_view" v-if="contentType == 1">
				</view>
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>

<script>
	import statusBar from "./uni-status-bar.vue";
	import uniIcons from "../uni-icons/uni-icons.vue";
	import Vue from 'vue';
	/**
	 * NavBar 自定义导航栏
	 * @description 导航栏组件，主要用于头部导航
	 * @tutorial https://ext.dcloud.net.cn/plugin?id=52
	 * @property {String} title 标题文字
	 * @property {String} leftText 左侧按钮文本
	 * @property {String} rightText 右侧按钮文本
	 * @property {String} leftIcon 左侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
	 * @property {String} rightIcon 右侧按钮图标（图标类型参考 [Icon 图标](http://ext.dcloud.net.cn/plugin?id=28) type 属性）
	 * @property {String} color 图标和文字颜色
	 * @property {String} backgroundColor 导航栏背景颜色
	 * @property {Boolean} fixed = [true|false] 是否固定顶部
	 * @property {Boolean} statusBar = [true|false] 是否包含状态栏
	 * @property {Boolean} shadow = [true|false] 导航栏下是否有阴影
	 * @event {Function} clickLeft 左侧按钮点击时触发
	 * @event {Function} clickRight 右侧按钮点击时触发
	 * @event {Function} clickTitle 中间标题点击时触发
	 */
	
	export default {
		name: "UniNavBar",
		components: {
			statusBar,
			uniIcons
		},
		props: {
			scrollTopC: {
				type: Number,
				default: 0
			},
			title: {
				type: String,
				default: ""
			},
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: "arrowleft"
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: [Boolean, String],
				default: false
			},
			border: {
				type: [Boolean, String],
				default: true
			},
			contentType: { //类型 1-标题 2-搜索框
				type: [Number, String],
				default: 1
			},
			placeholder: {
				type: String,
				default: "搜索目的地/产品名称"
			},
			desId: { //搜索目的地id
				type: [Number, String],
				default: null
			}
		},
        mounted() {
          if(uni.report && this.title !== '') {
              uni.report('title', this.title)
          }
        },
		methods: {
			onClickLeft() {
				if(this.leftIcon == 'gear'){
					uni.navigateTo({
					    url: '/pagesB/set/set'
					})
					return
				}
				if(getCurrentPages().length>1){
					uni.navigateBack();
				}else{
					uni.reLaunch({
					    url: '/pages/index/index'
					});
				}
			},
			onClickTitle() {
				this.$emit("clickTitle");
			},
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search' + (this.desId == null? '': '?desId=' + this.desId)
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	/* #ifdef MP-ALIPAY */
	$nav-height: 48px;
	/* #endif */
	/* #ifndef MP-ALIPAY */
	$nav-height: 44px;
	/* #endif */
	
	.uni-navbar-import{
		background-color: #fff !important;
		
		.uni-text-import{
			color: #313A5A !important;
		}
	}

	.uni-nav-bar-text {
		/* #ifdef APP-PLUS */
		font-size: 34rpx;
		/* #endif */
		/* #ifndef APP-PLUS */
		font-size: 32rpx;
		/* #endif */
		max-width: 380rpx;
	}

	.uni-nav-bar-right-text {
		font-size: 28rpx;
	}

	.uni-navbar__content {
		position: relative;
		background-color: #fff;
		overflow: hidden;
		// width: 750rpx;
	}

	.uni-navbar__content_view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		// background-color: #FFFFFF;
	}

	.uni-navbar__header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		height: $nav-height;
		line-height: $nav-height;
		font-size: 16px;
		// background-color: #ffffff;
	}

	.uni-navbar__header-btns {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-wrap: nowrap;
		width: 120rpx;
		padding: 0 6px;
		justify-content: center;
		align-items: center;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}

	.uni-navbar__header-btns-left {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: flex-start;
	}

	.uni-navbar__header-btns-right {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		width: 150rpx;
		padding-right: 30rpx;
		justify-content: flex-end;
	}

	.uni-navbar__header-container {
		flex: 1;
	}

	.uni-navbar__header-container-inner {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
	
	.uni-navbar__header-container-inner2 {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex: 1;
		align-items: center;
		justify-content: flex-start;
		font-size: 28rpx;
	}
	
	.uni-navbar__placeholder-view {
		height: $nav-height;
	}

	.uni-navbar--fixed {
		position: fixed;
		z-index: 998;
		left: var(--window-left);
		right: var(--window-right);
	}

	.uni-navbar--shadow {
		/* #ifndef APP-NVUE */
		box-shadow: 0 1px 6px #ccc;
		/* #endif */
	}

	.uni-navbar--border {
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	.search-box{
		/* #ifdef H5 */
		width: 90%;
		/* #endif */
		/* #ifndef H5 */
		width: 80%;
		/* #endif */
		border-radius: 32px;
		height: 32px;
		
		margin-left: 30rpx;
		display: flex;
		align-items: center;
		overflow: hidden;
		color: #FFFFFF;
		line-height: 40rpx;
		font-size: 28rpx;
		position: relative;
		z-index: 1;
		.search-box-img{
			width: 30rpx;
			height: 30rpx;
			margin:0 16rpx 0 28rpx;
		}
	}
</style>
