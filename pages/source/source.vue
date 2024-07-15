<template>
	<view class="box" v-if="!loading">
		<view class="box-title">
			材料提交
		</view>
		<view class="box-tip">
			材料参考和记录全部在这里
		</view>
		<view class="box-banner">
			<banner :list="list" dots="bottomCenter" ref="banner" bannerHeight="900" @changeCurrent="changeIndex" >
				<view class="banner-content">
					<view class="banner-content-title">
						品牌：{{list[currentIndex].brand}}
					</view>
					<view class="banner-content-item">
						型号：{{list[currentIndex].model}}
					</view>
					<view class="banner-content-item">
						尺寸：{{list[currentIndex].size}}
					</view>
					<view class="banner-content-item">
						数量：{{list[currentIndex].quantity}}
					</view>
				</view>
			</banner>
		</view>
		<view class="box-list flex-wrap flex-center-space">
			<view class="box-list-item" v-for="(item,index) in list" :key="index" @click="changeImg(index)">
				<image :src="item.fileUrlList[0]" mode="aspectFill"></image>
			</view>
		</view>
		
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/new.vue'
	import Banner from "@/components/banner/banner.vue"
	import { getMaterialList } from '@/api/index.js'
	export default {
		components:{
			tabBar,
			Banner
		},
		data() {
			return {
				loading: true,
				list: [],
				currentIndex: 0
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				getMaterialList().then(res=>{
					this.list = res || [];
					this.loading = false
				})
				
			},
			changeIndex(index){
				this.currentIndex = index
			},
			changeImg(index){
				this.$refs.banner.setIndex(index)
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	padding: 0 30rpx env(safe-area-inset-bottom);
	.box-title{
		padding: 20rpx 0rpx 0;
		font-size: 35rpx;
		color: #383838;
		font-weight: bold;
	}
	.box-tip{
		color: #666;
		font-size: 28rpx;
		padding: 20rpx 0rpx;
	}
	.box-banner{
		border-radius: 30rpx;
		width: 100%;
		overflow: hidden;
		position: relative;
		.banner-content{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			padding: 20rpx 35rpx;
			color: #666666;
			font-size: 24rpx;
			z-index: 1;
			background: #fff;
			.banner-content-title{
				font-weight: bold;
				font-size: 40rpx;
			}
			.banner-content-item{
				padding-top: 10rpx;
			}
		}
	}
	.box-list{
		padding-bottom: 30rpx;
		.box-list-item{
			overflow: hidden;
			border-radius: 30rpx;
			width: 210rpx;
			height: 280rpx;
			margin-top: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
