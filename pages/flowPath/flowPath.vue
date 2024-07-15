<template>
	<view class="box">
		<view class="box-content flex-center-center flex-column">
			<view class="box-view flex-center-center flex-column" v-for="(t,i) in tlist" :key="i">
				<view class="box-view-title" @click="showDetail(t)">
					{{t.name}}
				</view>
				<view class="flex-center-center" v-for="(s,j) in t.list" :key="j" v-if="t.show">
					<view class="box-item" :class="{'box-item-a': status == s.step}">
						{{s.name}}
					</view>
					
				</view>
			</view>
		</view>
		
		<view style="height: 120rpx;"></view>
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/new.vue'
	import { getProjectInfo, stepNext } from '@/api/user.js'
	export default {
		components:{
			tabBar
		},
		data() {
			return {
				status: 0,
				tlist: [{
					name: '设计阶段',
					show: false,
					list: [{
						name: '问卷调查',
						step: 1
					},{
						name: '平面设计',
						step: 3
					},{
						name: 'SU建模',
						step: 4
					},{
						name: '施工图设计',
						step: 5
					}] 
				},{
					name: '施工前清单阶段',
					show: false,
					list: [{
						name: '制作物料表',
						step: 7
					},{
						name: '制作预算清单',
						step: 7
					},{
						name: '全屋资金企划书',
						step: 7
					}] 
				},{
					name: '施工前准备阶段',
					show: false,
					list: [{
						name: '施工组织交流',
						step: 8
					},{
						name: '物料工期安排',
						step: 8
					}] 
				},{
					name: '施工阶段',
					show: false,
					list: [{
						name: '拆改施工',
						step: 9
					},{
						name: '土建施工',
						step: 10
					},{
						name: '封窗施工',
						step: 11
					},{
						name: '砌墙施工',
						step: 12
					},{
						name: '水电施工',
						step: 13
					},{
						name: '暖通施工',
						step: 14
					},{
						name: '泥瓦施工',
						step: 15
					},{
						name: '木作施工',
						step: 16
					},{
						name: '油作施工',
						step: 17
					},{
						name: '石材安装',
						step: 20
					},{
						name: '地板安装',
						step: 20
					},{
						name: '美缝施工',
						step: 20
					},{
						name: '定制安装',
						step: 20
					},{
						name: '水电安装',
						step: 21
					},{
						name: '开荒保洁',
						step: 22
					},{
						name: '电器安装及软装进场',
						step: 23
					}] 
				},{
					name: '项目总结',
					show: false,
					list: [] 
				}]
			}
		},
		onShow() {
			this.getProjectInfo()
		},
		methods: {
			showDetail(t){
				t.show = !t.show
			},
			getProjectInfo(){
				if(!this.$store.state.userInfo.id) return;
				getProjectInfo().then(res=>{
					this.status = res.step;
				})
			},
		}
	}
</script>

<style scoped lang="scss">
.box{
	padding-bottom: env(safe-area-inset-bottom);
	overflow: hidden;
	min-height: 100vh;
	box-sizing: border-box;
	color: #383838;
	
	.box-content{
		padding-top: 48rpx;
		.box-view{
			padding-bottom: 64rpx;
			position: relative;
			.box-view-title{
				display: inline-block;
				padding: 0 24rpx;
				line-height: 108rpx;
				background: $uni-color-primary;
				font-size: 52rpx;
				color: #fff;
				min-width: 256rpx;
				box-sizing: border-box;
				border-radius: 20rpx;
				position: relative;
				z-index: 2;
				text-align: center;
				margin: 0 auto;
			}
			&::after{
				content: '';
				position: absolute;
				z-index: 0;
				bottom: 0;
				top: 0;
				width: 10rpx;
				background: rgba(0, 186, 173, 0.2);
				left: 50%;
				margin-left: -5rpx;
			}
			.box-item{
				position: relative;
				z-index: 2;
				font-size: 40rpx;
				color: rgba(56, 56, 56, 1);
				background: #fff;
				padding: 10rpx 26rpx;
				margin-top: 40rpx;
				border-radius: 10rpx;
				&.box-item-a{
					background: #FF8D1A;
					color: #000;
				}
			}
			&:last-child{
				&::after{
					display: none;
				}
			}
		}
	}
	
}
</style>
