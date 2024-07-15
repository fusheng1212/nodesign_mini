<template>
	<view class="box" v-if="!loading">
		<view class="box-title" v-html="info[status].title"></view>
		<view class="box-view" v-for="(item,i) in list" :key="i">
			<view class="box-view-title flex-center-space">
				<view class="flex-center"  :class="{'box-view-active': item.isDone}" @click="submit(item,i)">
					<view class="box-view-radio"></view>
					<view class="box-view-text">{{item.title}}</view>
				</view>
				<view>{{item.location}}</view>
			</view>
			<view class="box-view-content flex-end-space">
				<view v-html="item.content" class="box-view-lf"></view>
				<view>{{item.number}}({{item.unit}})</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getMatters, stepNext } from '@/api/user.js'
	export default {
		data() {
			return {
				loading: true,
				info: {
					9: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					10: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					11: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					12: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					13: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					14: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					15: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					16: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					17: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					19: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					20: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					21: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					22: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					23: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					24: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					},
					25: {
						title: '施工协办事项如下，<br>完成购买后请打勾进行确认，<br>并将产品照片及参数发到群中。'
					}
				},
				status: 0,
				list: []
			}
		},
		onLoad(option) {
			if(!option.status) return uni.reLaunch({
				url: '/pages/index/index'
			});
			this.status = option.status;
			this.projectId = option.id;
			this.getlist()
		},
		methods: {
			getlist(){
				getMatters({
					projectId: this.projectId,
					stepNum: this.status
				}).then(res=>{
					let list = [{
						"title": "入墙龙头",
						"content": "建议品牌：智奈卫浴旗舰店<br>建议形式：厨房水池/浴缸<br建议颜色： 黑色",
						"number": 3,
						"unit": "个",
						"location": "厨房/浴室",
						"isDone": 0
					},{
						"title": "入墙花洒",
						"content": "推荐品牌:智奈卫浴旗舰店<br>尺寸: 100mmX175mm<br>建议购买银色",
						"number": 1,
						"unit": "个",
						"location": "浴室",
						"isDone": 0
					},{
						"title": "浴缸",
						"content": "推荐品牌:智奈卫浴旗舰店<br>尺寸: 100mmX175mm<br>建议购买银色",
						"number": 1,
						"unit": "个",
						"location": "浴室",
						"isDone": 0
					},{
						"title": "壁挂炉",
						"content": "",
						"number": 1,
						"unit": "个",
						"location": "厨房",
						"isDone": 0
					},{
						"title": "中央空调",
						"content": "",
						"number": 1,
						"unit": "个",
						"location": "客厅",
						"isDone": 0
					}]
					this.list = list;
					this.loading = false
				})
			},
			submit(item,i){
				item.isDone = 1;
				let info = this.list.filter(t=>t.isDone);
				if(info.length == this.list.length){
					uni.showModal({
						title: '提示',
						showCancel: false,
						confirmColor: this.uniColorPrimary,
						content: '协办事项已全部完成！',
						success: (res) => {
							if (res.confirm) {
								this.stepNext()
							}
						}
					})
				}
			},
			stepNext(){
				stepNext({
					"projectId": this.projectId,
					"stepNum": this.status
				}).then(res=>{
					uni.navigateBack()
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.box{
	font-size: 28rpx;
	.box-title{
		padding: 30rpx;
		text-align: center;
		color: rgba(128, 128, 128, 1);
		line-height: 60rpx;
		font-size: 32rpx;
	}
	.box-view{
		background: #fff;
		border-radius: 30rpx;
		margin: 0 20rpx 20rpx;
		padding: 0 20rpx 15rpx;
		.box-view-title{
			height: 96rpx;
			font-size: 36rpx;
			border-bottom: 1px solid rgba(212, 212, 212, 1);
			.box-view-radio{
				border: 1px solid rgba(0, 0, 0, 1);
				width: 46rpx;
				height: 46rpx;
				border-radius: 100%;
				margin-right: 15rpx;
			}
			.box-view-active{
				.box-view-radio{
					background: rgba(0, 186, 173, 1);
				}
				.box-view-text{
					text-decoration-line: line-through;
					text-decoration-color: rgba(0, 186, 173, 1);
				}
			}
		}
		.box-view-content{
			padding: 20rpx 0;
			font-size: 40rpx;
			line-height: 40rpx;
			.box-view-lf{
				flex: 2;
				font-size: 32rpx;
			}
		}
	}
}
</style>
