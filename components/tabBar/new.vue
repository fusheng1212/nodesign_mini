<!-- 底部自定义tabBer组件 -->
<template>
	<view>
		<view class="tabbar" :style="{paddingBottom: paddingBottom + 'px'}">
			<view class="tabbar-item" v-for="(item,index) in list" @click="tabbarChange(index)"
				:class="[currentIndex == index ? 'active':'']" :key="index" v-if="item.isDefault">
				<view class="tabbar-item-pic">
					<image :src="item.img" v-show="currentIndex == index" mode="heightFix" class="tabbar-item-img"></image>
					<image :src="item.uncheckedImg" v-show="currentIndex != index" mode="heightFix" class="tabbar-item-img"></image>
				</view>
				<view class="tabbar-item-txt">{{item.name}}</view>
			</view>
		</view>
		<!-- 页面占位 -->
		<view class="tabbar-height" :style="{paddingBottom: paddingBottom + 'px'}">
			<view class="tabbar-tip">N DESIGN·STUDIO·DALIAN</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			hideIndex: { //隐藏的按钮
				type : Array,
				default: []
			}
		},
		watch: {
			currentRoute(newValue, oldValue) {
				this.init()
			}
		},
		data() {
			return {
				currentIndex: -1,
				paddingBottom: uni.getSystemInfoSync().safeAreaInsets.bottom || 0,
				list: [{
						id: 0,
						name: '文件库',
						isDefault: true,
						urlPath: '/pages/files/files',
						uncheckedImg: '/static/tabar_1.png',
						img: '/static/tabar_1_s.png'
					},
					{
						id: 1,
						name: '材料照片',
						isDefault: true,
						urlPath: '/pages/source/source',
						uncheckedImg: '/static/tabar_2.png',
						img: '/static/tabar_2_s.png'
					},
					{
						id: 2,
						name: '全部流程',
						isDefault: true,
						urlPath: '/pages/flowPath/flowPath',
						uncheckedImg: '/static/tabar_3.png',
						img: '/static/tabar_3_s.png'
					}
				]
			}
		},
		computed: {
			// 当前路由页面
			currentRoute() {
				let pages = getCurrentPages()
				let currentRoute = pages[pages.length - 1].route
				return '/' + currentRoute
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				this.list.map((item, index) => {
					if (item.urlPath == this.currentRoute) {
						this.currentIndex = index
					}
				})
				this.hideIndex.map(item=>{
					this.list[item].isDefault = false
				})
			},
			// 页面切换
			tabbarChange(index) {
				let url = this.list[index].urlPath
				uni.navigateTo({
					url: url
				});
			},
		},
	}
</script>
<style lang="scss" scoped>
	.tabbar {
		height: 115rpx;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
		// box-sizing: border-box;
		background: #fff;
		display: flex;
		// box-shadow: 0px -2px 4px 0px rgba(0, 0, 0, 0.1);
		.tabbar-item {
			flex: 1;
			height: 100%;
			box-sizing: border-box;
			color: #BFC2C8;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			font-size: 20rpx;

			&.active {
				color: $uni-color-primary;
			}

			.tabbar-item-pic {
				width: 40rpx;
				height: 40rpx;
				
				.tabbar-item-img {
					width: 100%;
					height: 100%;
				}
			}

			.tabbar-item-txt {
				margin-top: 8rpx;
			}
		}
	}

	.tabbar-height {
		height: 175rpx;
		background: transparent;
		.tabbar-tip{
			font-size: 22rpx;
			color: #616161;
			line-height: 60rpx;
			text-align: center;
		}
	}
</style>
