<template>
	<view class="box">
		<view class="box-top flex-center-center flex-column" @click="handleLogin">
			<image :src="userInfo.img || '/static/images/headImg.png'" mode="aspectFill" class="user-img"></image>
		</view>
		<view class="box-view">
			<view class="user-name" v-if="userInfo.id">{{userInfo.name || '未知用户'}}</view>
			<view class="user-name" v-else>点击头像登录</view>
			<view class="user-address">{{userInfo.address || ''}}</view>
			<view class="questionnaire-box flex-center-center  flex-column" @click="handlePace">
				<image src="../../static/images/my_btn.png" mode="widthFix"></image>
				<view v-if="!paceData[status].isDisable">{{paceData[status].btnText || '点击查看'}}</view>
			</view>
		</view>
		<view class="box-view pace-box flex-center-space" :class="{'pace-box-t': status == 2}">
			<view class="pace-box-lf">
				<view class="pace-status" :style="{ width: paceData[status].proportion + '%'}" v-if="paceData[status].proportion"></view>
			</view>
			<view class="pace-box-gt flex-center-center" :style="{color: status>22?'#fff':'#616161',right:status==23?'10%':0}" v-if="paceData[status].proportion">{{ paceData[status].name }}</view>
			<view class="pace-box-gt flex-center-center" v-else>
				<image src="../../static/images/s.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="pace-text" v-if="status !=26">
			{{paceData[status].proportion || 0}}%
		</view>
		<view class="flex-center-center box-img flex-column">
			<image :src="paceData[status].icon"  mode="widthFix"></image>
		</view>
		
		<view class="box-right-box" v-if="paceData[status].needBefore" @click="toDetail('/pages/matters/matters?status=' + status + '&id=' + projectInfo.projectId)">
			待协办
		</view>
		
		<uniPopup :show="showDialog" position="middle" mode="middle" @hidePopup="showDialog = false">
			<view class="dialog-box">
				<view class="dialog-title" v-if="paceData[status].dialogTitle">
					{{paceData[status].dialogTitle}}
				</view>
				<view class="dialog-title" v-else>
					{{paceData[status].name}}阶段
				</view>
				<view v-html="paceData[status].tip"></view>
				<view class="dialog-btn flex-center-center" v-if="paceData[status].hasTipBtn" @click="makeSure">
					<view class="dialog-btn-t flex-center-center">
						<view class="dialog-icon" v-if="paceData[status].hasTipBtn !== 1"></view>
						<view>{{paceData[status].hasTipBtn === 1? '确认' : paceData[status].tipBtnText || (paceData[status].name + '阶段确认')}}</view>
					</view>
				
				</view>
				<view class="dialog-btn2" v-if="paceData[status].needBefore && !paceData[status].hasTipBtn && !paceData[status].hasTipBtnList" @click="toDetail('/pages/matters/matters?status=' + status + '&id=' + projectInfo.projectId)">
					点击查看协办事项
				</view>
				<view class="dialog-sure-box" v-if="paceData[status].hasTipBtnList">
					<view class="sure-btn-item flex-center-center" v-for="(tip,tipI) in paceData[status].hasTipBtnList" @click="makeSureList(tipI)">
						<view class="sure-btn-item-t flex-center-center">
							<view class="dialog-icon flex-center-center" :class="{'dialog-icon-a': tip.value}">&#10003;</view>
							<view>{{tip.title}}</view>
						</view>
					</view>
				</view>
			</view>
		</uniPopup>
		
		<tabBar></tabBar>
	</view>
</template>

<script>
	import tabBar from '@/components/tabBar/new.vue'
	import utils from '@/utils/utils.js'
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	import { getProjectInfo, stepNext } from '@/api/user.js'
	export default {
		components:{
			tabBar,
			uniPopup
		},
		data() {
			return {
				paddingBottom: uni.getSystemInfoSync().safeAreaInsets.bottom || 0,
				status: 0,
				projectInfo: {},
				paceData:{
					0: {
						name: '未登录',
						proportion: 0,
						icon: '/static/images/my_card0.png',
						tip: '',
						isDisable: true
					},
					1: {
						name: '调查问卷',
						proportion: 0,
						icon: '/static/images/my_card1.png',
						tip: '',
						btnText: '点击填写',
					},
					2: {
						name: '设计准备',
						proportion: 5,
						icon: '/static/images/my_card2.png',
						hasTipBtn: 1,
						tip: '您好，我们已经在设计准备阶段<br>请耐心等候<br>需要您发送至少一套<br>您喜欢的案例到项目群<br>（可在小红书搜索）'
					},
					3: {
						name: '平面设计',
						proportion: 8,
						icon: '/static/images/my_card2.png',
						hasTipBtn: true,
						tipBtnText: '平面方案设计确认',
						tip: '您好，我们已经开始设计工作<br>平面设计阶段周期为<br>10~15个工作日<br>过程中如有疑问我们会随时询问您<br>完成后我们会提前和您约时间碰方案'
					},
					4: {
						name: 'SU建模',
						proportion: 10,
						icon: '/static/images/my_card3.png',
						hasTipBtn: true,
						tip: '您好，我们已经开始建模工作<br>SU建模阶段周期为<br>15个工作日<br>过程中如有疑问我们会随时询问您<br>完成后我们会提前和您约时间碰方案'
					},
					5: {
						name: '施工图绘制',
						proportion: 12,
						hasTipBtn: true,
						icon: '/static/images/my_card4.png',
						tip: '您好，我们已经开始建模工作<br>SU建模阶段周期为<br>15个工作日<br>过程中如有疑问我们会随时询问您<br>完成后我们会提前和您约时间碰方案'
					},
					6: {
						name: '问卷调查',
						proportion: 12,
						icon: '/static/images/my_card1.png',
						tip: '',
						btnText: '点击填写',
					},
					7: {
						name: '施工前清单',
						proportion: 15,
						icon: '/static/images/my_card5.png',
						dialogTitle: '施工前清单整理',
						tip: '施工前清单整理需要约<br>10~15个工作日<br>感谢您的耐心等待',
						hasTipBtnList:[{
							title: '制作物料表',
							value: false
						},{
							title: '制作预算清单',
							value: false
						},{
							title: '制作全屋资金计划书',
							value: false
						}]
					},
					8: {
						name: '施工前准备',
						proportion: 23,
						icon: '/static/images/my_card6.png',
						hasTipBtn: 1,
						tip: '您好，在正式开始施工前<br>我们会进行：<br>施工组织交流<br>物料工期安排<br>暂定1月1日开工<br>预祝开工大吉<br>感谢您的耐心等待'
					},
					9: {
						name: '拆改施工',
						proportion: 28,
						icon: '/static/images/my_card7.png',
						tip: '您好，拆改施工阶段<br>周期约为<br>15工作日<br>感谢您的耐心等待',
						needBefore: true
					},
					10: {
						name: '土建施工',
						proportion: 29,
						icon: '/static/images/my_card8.png',
						tip: '您好，土建施工阶段<br>周期约为<br>10~15工作日<br>感谢您的耐心等待',
						needBefore: true
					},
					11: {
						name: '封窗施工',
						proportion: 30,
						icon: '/static/images/my_card9.png',
						tip: '您好，封窗施工阶段<br>周期约为<br>7工作日<br>感谢您的耐心等待',
						needBefore: true
					},
					12: {
						name: '砌墙施工',
						proportion: 35,
						icon: '/static/images/my_card10.png',
						tip: '您好，砌墙施工阶段<br>周期约为<br>7工作日<br>感谢您的耐心等待',
						needBefore: true
					},
					13: {
						name: '水电施工',
						proportion: 40,
						icon: '/static/images/my_card11.png',
						tip: '您好，水电施工阶段<br>周期约为<br>15工作日<br>感谢您的耐心等待',
						needBefore: true
					},
					14: {
						name: '暖通施工',
						proportion: 45,
						icon: '/static/images/my_card12.png',
						tip: '您好，暖通施工阶段<br>周期约为<br>15工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					15: {
						name: '泥瓦施工',
						proportion: 50,
						icon: '/static/images/my_card13.png',
						tip: '您好，泥瓦施工阶段<br>周期约为<br>30工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					16: {
						name: '木作施工',
						proportion: 55,
						icon: '/static/images/my_card14.png',
						tip: '您好，木作施工阶段<br>周期约为<br>30工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					17: {
						name: '油作施工',
						proportion: 60,
						icon: '/static/images/my_card15.png',
						tip: '您好，油作施工阶段<br>周期约为<br>10-15工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					
					18: {
						name: '油作施工完成',
						dialogTitle: '油作施工阶段已完成',
						proportion: 65,
						icon: '/static/images/my_card15.png',
						tip: '您好，前期基础施工部分基本结束<br>感谢您一直以来<br>对我们工作的支持和配合<br>未来一段时间工地上没有我方的施工人员<br>我们会继续协调和组织后期的<br>第三方安装时间和细节<br>不作设计工作室<br>全心全意为您服务',
						hasTipBtn: 1,
						needBefore: true,
					},
					19: {
						name: '油作施工问卷',
						proportion: 65,
						icon: '/static/images/my_card1.png',
						tip: '',
						btnText: '点击填写',
						needBefore: true
					},
					20: {
						name: '第三方安装',
						proportion: 70,
						icon: '/static/images/my_card13.png',
						tip: '您好，第三方安装阶段包括',
						needBefore: true,
						hasTipBtnList:[{
							title: '石材安装',
							value: false
						},{
							title: '地板安装',
							value: false
						},{
							title: '美缝施工',
							value: false
						},{
							title: '定制安装',
							value: false
						}]
					},
					21: {
						name: '水电安装',
						proportion: 85,
						icon: '/static/images/my_card13.png',
						tip: '您好，水电安装阶段<br>周期约为<br>7工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					// 22: {
					// 	name: '电器安装',
					// 	proportion: 90,
					// 	icon: '/static/images/my_card17.png',
					// 	tip: '电器安装需要约<br><b>1</b><br>周期<br>感谢您的耐心等待',
					// 	needBefore: true,
					// },
					22: {
						name: '开荒保洁',
						proportion: 90,
						icon: '/static/images/my_card13.png',
						tip: '您好，开荒保洁阶段<br>周期约为<br>3工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					23: {
						name: '电器安装&软装进场',
						proportion: 90,
						dialogTitle: '电器安装&软装进场',
						icon: '/static/images/my_card13.png',
						tip: '当前阶段<br>周期约为<br>15工作日<br>感谢您的耐心等待',
						needBefore: true,
					},
					24: {
						name: '交付仪式',
						proportion: 100,
						icon: '/static/images/my_card18.png',
						tip: '交付仪式时间为：<br>/月/日<br>感谢您的支持与配合<br>祝您入住愉快',
						hasTipBtn: 1,
					},
					25: {
						name: '问卷调查',
						proportion: 100,
						icon: '/static/images/my_card1.png',
						tip: '',
						btnText: '点击填写',
					},
					26: {
						name: '施工进行中',
						proportion: 100,
						icon: '/static/images/my_card13.png',
						tip: '',
					},
					27: {
						name: '已入驻',
						proportion: 100,
						icon: '/static/images/my_card19.png',
						tip: '',
					},
				},
				showDialog: false
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			}
		},
		onShow() {
			this.getProjectInfo()
		},
		methods: {
			jumpFor: utils.jumpFor,
			getProjectInfo(){
				if(!this.userInfo.id) return;
				getProjectInfo().then(res=>{
					this.projectInfo = res;
					this.status = res.step;
					// this.status = 21;
				})
			},
			toDetail(path){
				this.showDialog = false
				utils.jumpFor(path)
			},
			handlePace(){
				let item = this.paceData[this.status]
				if(item.isDisable) return;
				if(item.tip){ //有提示，需要弹窗
					this.showDialog = true;
				}else{
					if(this.status == 1 || this.status == 6 || this.status == 19 || this.status == 25){
						utils.jumpFor('/pages/questionnaire/questionnaire?status=' + this.status+ '&id=' + this.projectInfo.projectId)
					}
					if(this.status == 26){
						utils.jumpFor('/pages/needToDo/needToDo')
					}
					
					// if(this.status == 2){
					// 	uni.showModal({
					// 		title: '',
					// 		cancelColor: '#89939C',
					// 		confirmColor: this.uniColorPrimary,
					// 		content: '该阶段确认已完成？',
					// 		success: (res) => {
					// 			if (res.confirm) {
					// 				this.stepNext()
					// 			}
					// 		}
					// 	})
					// }
				}
				
			},
			makeSure(){
				this.showDialog = false;
				// if(this.status == 7 || this.status == 24) return;
				this.stepNext()
			},
			makeSureList(index){
				this.paceData[this.status].hasTipBtnList[index].value = true;
				let list = this.paceData[this.status].hasTipBtnList.filter(t=>t.value);
				if(list.length == this.paceData[this.status].hasTipBtnList.length){
					this.paceData[this.status].hasTipBtnList = null;
					this.paceData[this.status].dialogTitle = '您的文件已确认';
					if(this.status == 7){
						this.paceData[this.status].tip = '即将进入<br>施工前准备阶段<br>感谢您的耐心等候';
					}
					if(this.status == 20){
						this.paceData[this.status].dialogTitle = '水电安装阶段';
						this.paceData[this.status].tip = '您好，第三方安装阶段已经完成<br>即将进入水电安装阶段<br>感谢您的耐心等候与配合';
					}
					this.paceData[this.status]['hasTipBtn'] = 1
				}
			},
			stepNext(){
				stepNext({
					"projectId": this.projectInfo.projectId,
					"stepNum": this.status
				}).then(res=>{
					this.getProjectInfo()
				})
			},
			handleLogin(){
				if(this.userInfo.id) return;
				utils.jumpFor('/pages/login/login')
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	padding-bottom: env(safe-area-inset-bottom);
	overflow: hidden;
	padding-top: 20rpx;
	.box-top{
		padding: 20rpx;
		border-radius: 100%;
		margin: 0 auto -115rpx;
		background: #fff;
		width: 220rpx;
		.user-img{
			width: 212rpx;
			height: 212rpx;
			border-radius: 100%;
		}
		
	}
	.box-view{
		background: #fff;
		margin: 0rpx 40rpx 40rpx;
		border-radius: 30rpx;
		overflow: hidden;
		.user-name{
			font-size: 72rpx;
			font-weight: 400;
			margin-top: 120rpx;
			text-align: center;
		}
		.user-address{
			color: rgba(128, 128, 128, 1);
			font-size: 32rpx;
			margin-top: 10rpx;
			text-align: center;
			line-height: 60rpx;
			height: 60rpx;
		}
		.questionnaire-box{
			padding: 10rpx 0 24rpx;
			font-size: 32rpx;
			color: rgba(128, 128, 128, 1);
			image{
				width: 250rpx;
				height: 250rpx;
				margin-bottom: 20rpx;
			}
		}
		&.pace-box{
			height: 100rpx;
			border-radius: 30rpx;
			font-size: 36rpx;
			color: #616161;
			overflow: hidden;
			position: relative;
			&.pace-box-t{
				border-radius: 20rpx;
			}
			.pace-box-lf{
				width: 100%;
				height: 100%;
				.pace-status{
					border-radius: 40rpx;
					background: rgba(0, 186, 173, 1);
					width: 0;
					position: relative;
					transition: width .5s;
					height: 100%;
					// &::after{
					// 	content: '';
					// 	position: absolute;
					// 	z-index: 1;
					// 	right: 40rpx;
					// 	top: 20rpx;
					// 	bottom: 20rpx;
					// 	background: #FAFAFA;
					// 	border-radius: 8rpx;
					// 	width: 8rpx;
					// }
				}
				
			}
			.pace-box-gt{
				padding-right: 15rpx;
				position: absolute;
				right: 0;
				top: 0;
				bottom: 0;
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
		
	}
	.pace-text{
		color: rgba(82, 51, 51, 1);
		font-size: 32rpx;
		line-height: 60rpx;
		margin-top: 12rpx;
		padding: 0 40rpx;
	}
	.box-img{
		image{
			margin-top: 28rpx;
			width: 316rpx;
			height: 316rpx;
			margin-bottom: 40rpx;
		}
	}
	
	.box-right-box{
		position: fixed;
		z-index: 1;
		right: 16rpx;
		top: 900rpx;
		width: 112rpx;
		line-height: 112rpx;
		border-radius: 100%;
		color: #fff;
		background: rgba(0, 186, 173, 1);
		text-align: center;
		box-shadow: 0rpx 4rpx 8rpx  rgba(0, 0, 0, 0.25);
		font-size: 28rpx;
		margin-bottom: 130rpx;
	}
	
	.dialog-box{
		background: #fff;
		width: 700rpx;
		border-radius: 20rpx;
		text-align: center;
		line-height: 60rpx;
		font-size: 32rpx;
		box-sizing: border-box;
		padding: 15rpx 40rpx 20rpx;
		.dialog-title{
			font-size: 68rpx;
			line-height: 100rpx;
		}
		.dialog-btn{
			margin-top: 25rpx;
			
			.dialog-btn-t{
				min-width: 250rpx;
				padding: 0 30rpx;
				line-height: 100rpx;
				font-size: 32rpx;
				border-radius: 70rpx;
				color: #fff;
				background: rgba(0, 186, 173, 1);
				box-sizing: border-box;
			}
			.dialog-icon{
				width: 46rpx;
				height: 46rpx;
				border-radius: 100%;
				margin-right: 15rpx;
				border: 1px solid #fff;
			}
		}
		.dialog-btn2{
			background: rgba(0, 186, 173, 1);
			color: #fff;
			line-height: 90rpx;
			border-radius: 90rpx;
			width: 350rpx;
			margin: 20rpx auto;
		}
		.dialog-sure-box{
			font-weight: bold;
			margin-top: 25rpx;
			.sure-btn-item{
				margin-bottom: 20rpx;
				
				.sure-btn-item-t{
					padding: 0 30rpx;
					line-height: 100rpx;
					font-size: 32rpx;
					border-radius: 70rpx;
					color: #fff;
					background: rgba(0, 186, 173, 1);
				}
				.dialog-icon{
					width: 46rpx;
					height: 46rpx;
					border-radius: 100%;
					margin-right: 15rpx;
					border: 1px solid #fff;
					font-size: 45rpx;
					color: rgba(0, 186, 173, 1);
					&.dialog-icon-a{
						color: #fff;
					}
				}
			}
		}
	}
}
</style>
