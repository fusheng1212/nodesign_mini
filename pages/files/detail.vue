<template>
	<view class="box" v-if="!loading">
		<view class="box-top">
			{{info.name}}
		</view>
		<image :src="info.url" mode="widthFix" class="box-img"></image>
		<view class="tabbar-tip">N DESIGN·STUDIO·DALIAN</view>
	</view>
</template>

<script>
	export default {
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
			getInfo(){
				this.info = {
					id: 1,
					name: '工艺说明辅料单',
					url: 'https://image.xisland.cn/1706889219158.png'
				}
				this.loading = false
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	text-align: center;
	font-size: 72rpx;
	color: #383838;
	padding: 10rpx;
	.box-img{
		width: 100%;
		margin-top: 30rpx;
	}
	.tabbar-tip{
		font-size: 22rpx;
		color: #616161;
		line-height: 60rpx;
		text-align: center;
		font-weight: 400;
	}
}
</style>
