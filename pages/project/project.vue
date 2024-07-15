<template>
	<view class="box">
		<view class="box-top flex-center">
			<view class="search-box flex-center">
				<uni-icons class="search-icon" color="#000" type="search" size="22" />
				<input type="text" placeholder="搜索的内容" v-model="keyword" placeholder-class="placeholder-class" @confirm='getList'>
			</view>
			<view class="search-btn" @click="getList">
				搜索
			</view>
		</view>
		
		<view class="box-view" v-for="(item,index) in list" :key="index" @click="jumpFor('/pages/project/detail?scene=' + item.id)">
			<view class="box-view-content">
				<image :src="item.img" mode="widthFix" class="box-view-img"></image>
				<view class="box-view-item">
					面积：{{item.area}}平方
				</view>
				<view class="box-view-item">
					风格：{{item.style}}
				</view>
				<view class="box-view-item">
					工艺：{{item.technology}}
				</view>
			</view>
			<view class="box-view-title">
				{{item.name}}
			</view>
		</view>
		
		<view class="box-bottom flex">
			<view class="box-bottom-item">
				往期案例
			</view>
			<view class="box-bottom-item"  @click="jumpFor('/pages/my/my')">
				我的进度
			</view>
		</view>
	</view>
</template>

<script>
	import utils from '@/utils/utils.js'
	import { getCaseInfoList } from '@/api/index.js'
	
	export default {
		data() {
			return {
				keyword: null,
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			jumpFor: utils.jumpFor,
			getList(){
				getCaseInfoList().then(res=>{
					
				})
				this.list = [{
					id: 1,
					name: '青云天下',
					area: 100,
					style: '中式古风',
					technology: '精细',
					img: 'https://image.xisland.cn/1706932680004.png'
				},{
					id: 2,
					name: '晴空万里',
					area: 100,
					style: '现代',
					technology: '简约',
					img: 'https://image.xisland.cn/1706932680005.png'
				},{
					id: 3,
					name: '罗曼帝国',
					area: 100,
					style: '欧洲',
					technology: '精细',
					img: 'https://image.xisland.cn/1706932680006.png'
				}]
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	color: #808080;
	font-size: 24rpx;
	padding: 80rpx 20rpx 120rpx;
	overflow: hidden;
	.box-top{
		position: fixed;
		z-index: 1;
		left: 0;
		right: 0;
		top: 0;
		padding: 10rpx 20rpx;
		background: #fff;
		height: 80rpx;
		box-sizing: border-box;
		border-bottom: 1px solid #eee;
		.search-box{
			flex: 2;
			background: #F7F7F7;
			border-radius: 80rpx;
			height: 100%;
			padding: 0 20rpx;
			font-size: 30rpx;
			color: #000;
			.search-icon{
				margin-right: 20rpx;
			}
		}
		.search-btn{
			color: #808080;
			font-size: 30rpx;
			padding-left: 20rpx;
		}
	}
	
	.box-view{
		margin-top: 20rpx;
		.box-view-content{
			background: #fff;
			overflow: hidden;
			border-radius: 20rpx;
			padding-bottom: 20rpx;
			.box-view-img{
				width: 100%;
				height: 500rpx;
				margin-bottom: 20rpx;
			}
			.box-view-item{
				line-height: 40rpx;
				padding: 0 20rpx;
			}
		}
		.box-view-title{
			font-size: 30rpx;
			font-weight: bold;
			text-align: center;
			color: #333333;
			line-height: 60rpx;
		}
	}
	
	.box-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
		background: #fff;
		.box-bottom-item{
			flex: 1;
			text-align: center;
			line-height: 100rpx;
			font-size: 32rpx;
			border-right: 1px solid #eee;
			&:last-child{
				border: none;
			}
		}
	}
}
</style>
