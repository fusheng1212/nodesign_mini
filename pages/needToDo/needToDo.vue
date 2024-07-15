<template>
	<view class="box">
		<view class="box-title">
			未来我们将参与以下任务
		</view>
		<view class="box-view flex-center" v-for="(t,i) in list">
			<view class="box-view-icon flex-center-center" :class="{'box-view-icon-a': t.check}">&#10003;</view>
			{{t.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				this.list = [{
					name: '拆改施工交底',
					check: false
				},{
					name: '土建施工交底',
					check: false
				},{
					name: '封窗图纸审核',
					check: false
				},{
					name: '砌墙施工交底',
					check: false
				},{
					name: '水电施工交底',
					check: false
				},{
					name: '暖通施工交底',
					check: false
				},{
					name: '泥瓦施工交底',
					check: false
				},{
					name: '木作施工交底',
					check: false
				},{
					name: '油作施工交底',
					check: false
				},{
					name: '定制安装审核',
					check: false
				},{
					name: '石材图纸审核',
					check: false
				},{
					name: '定制样式确认',
					check: false
				},{
					name: '地板样式确认',
					check: false
				},{
					name: '石材样式确认',
					check: false
				},{
					name: '乳胶漆样式确认',
					check: false
				},{
					name: '软装选品',
					check: false
				}]
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	.box-title{
		font-size: 60rpx;
		padding: 40rpx 0;
		text-align: center;
		margin-bottom: 17rpx;
	}
	.box-view{
		margin: 0 40rpx 34rpx;
		background: #fff;
		font-size: 40rpx;
		color: rgba(128, 128, 128, 1);
		border-radius: 30rpx;
		line-height: 80rpx;
		padding: 0 20rpx;
		.box-view-icon{
			width: 46rpx;
			height: 46rpx;
			border-radius: 100%;
			margin-right: 15rpx;
			border: 1px solid rgba(0, 0, 0, 1);
			font-size: 50rpx;
			color: transparent;
			&.box-view-icon-a{
				color: $uni-color-primary;
			}
		}
	}
}
</style>
