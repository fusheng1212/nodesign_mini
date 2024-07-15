<template>
	<view class="box">
		<view class="box-title">
			<!-- <image src="../../static/images/icon_1.png" mode="widthFix"></image> -->
			<view>文件库</view>
		</view>
		<view class="box-tip">
			咱们家所有重要文件都在这里啦
		</view>
		<view class="box-view flex-center" v-for="(item,index) in list" :key="index" @click="jumpFor('/pages/files/detail?scene=' + item.id)">
			{{item.name}}
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
				list:[]
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			jumpFor: utils.jumpFor,
			getList(){
				this.list = [{
					id: 1,
					name: '工艺说明辅料单'
				},{
					id: 2,
					name: '工艺说明辅料单'
				},{
					id: 3,
					name: '工艺说明辅料单'
				}]
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	padding: 0 30rpx env(safe-area-inset-bottom);
	.box-title{
		text-align: center;
		font-size: 72rpx;
		padding: 10rpx 0rpx;
		image{
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
	}
	.box-tip{
		color: rgba(128, 128, 128, 1);
		font-size: 32rpx;
		padding: 6rpx 0rpx 30rpx;
		text-align: center;
	}
	.box-view{
		background: #fff;
		margin-bottom: 20rpx;
		height: 94rpx;
		padding: 0 20rpx;
		color: rgba(56, 56, 56, 1);
		font-size: 40rpx;
	}
}
</style>
