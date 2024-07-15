<template>
	<view class="box" v-if="!loading">
		<view class="box-view">
			<image :src="info.img" mode="widthFix" class="box-view-img"></image>
			<view class="box-view-title">
				{{info.name}}
			</view>
			<view class="box-view-item">
				面积：{{info.area}}平方
			</view>
			<view class="box-view-item">
				风格：{{info.style}}
			</view>
			<view class="box-view-item">
				工艺：{{info.technology}}
			</view>
		</view>
		<view class="box-content">
			<MpHtml :content="replaceDetail(info.content)"></MpHtml>
		</view>
		
	</view>
</template>

<script>
	import MpHtml from "@/components/mp-html/mp-html.vue"
	import utils from '@/utils/utils.js'
	export default {
		components:{
			MpHtml
		},
		data() {
			return {
				loading: true,
				id: null,
				info: {}
			}
		},
		onLoad(option) {
			if(!option.scene) uni.reLaunch({
				url: '/pages/index/index'
			});
			this.id = option.scene
			this.getInfo()
		},
		methods: {
			replaceDetail: utils.replaceDetail,
			getInfo(){
				this.info = {
					id: 1,
					name: '青云天下',
					area: 100,
					style: '中式古风',
					technology: '精细',
					img: 'https://image.xisland.cn/1706932680004.png'
				}
				this.loading = false
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	color: #808080;
	font-size: 24rpx;
	padding: 20rpx;
	overflow: hidden;
	
	.box-view{
		background: #fff;
		overflow: hidden;
		border-radius: 20rpx;
		padding-bottom: 20rpx;
		.box-view-img{
			width: 100%;
			height: 500rpx;
			margin-bottom: 10rpx;
		}
		.box-view-title{
			font-size: 30rpx;
			font-weight: bold;
			color: #333333;
			padding: 0 20rpx;
			line-height: 45rpx;
		}
		.box-view-item{
			line-height: 40rpx;
			padding: 0 20rpx;
		}
	}
	.box-content{
		margin-top: 20rpx;
		background: #fff;
		padding: 20rpx 0;
	}
}
</style>
