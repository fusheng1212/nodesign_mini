<template>
	<view class="box flex-column flex-center">
		<view class="box-top flex-center-center">
			<image src="../../static/logo3.png" mode="widthFix"></image>
			<view>欢迎登录</view>
		</view>
		<view class="input-box flex-center-center">
			<view class="input-box-text">手机号</view>
			<view class="input-box-input">
				<input type="number" v-model="mobile" maxlength="11" :adjust-position="false">
			</view>
		</view>
		<view class="input-box flex-center-center">
			
			<view class="input-box-input">
				<input type="number" v-model="code" maxlength="6" placeholder="请输入验证码"
					placeholder-class="placeholder-class" :adjust-position="false">
			</view>
			<view class="input-box-text" @click="getCode">{{ !codeCheck? '倒计时' + currentTime+'s':'获取验证码' }}</view>
		</view>
		<view class="box-tip">登录即表示同意用户协议</view>
		<view class="login-btn"  @click="clickLogin">登录</view>
		<image src="../../static/images/login_1.png" mode="widthFix" class="login-img"></image>
		<view class="box-text">N DESIGN·STUDIO·DALIAN</view>
	</view>
</template>

<script>
	import utils from '@/utils/utils.js';
	import { getCode } from '@/api/index.js'
	export default {
		data() {
			return {
				loading: false,
				code: null,
				mobile: null,
				codeCheck: true,
				currentTime: 60
			}
		},
		methods: {
			getCode(){
				if (this.loading) return
				if (utils.checkMobile(this.mobile)) {
					if (this.codeCheck) {
						this.loading = true
						this.countDown()
						getCode({
							phone: this.mobile
						}).then(_ => {
							this.loading = false
						}).catch(_ => {
							this.loading = false
						})
					}
				} else {
					uni.showToast({
						title: '请填写正确的手机号',
						icon: 'none',
						duration: 2000
					});
				}
			},
			// 验证码倒计时
			countDown: function() {
				var that = this
				var currentTime = that.currentTime
				this.codeCheck = false
				var interval = setInterval(function() {
					that.currentTime = currentTime - 1
					currentTime--
					if (currentTime <= 0) {
						clearInterval(interval)
						that.currentTime = 60
						that.codeCheck = true
					}
				}, 1000)
			},
			clickLogin(){
				if (this.loading) return;
				if(!utils.checkMobile(this.mobile)) return uni.showToast({
					title: '请填写正确的手机号',
					icon: 'none',
					duration: 2000
				});
				if(!this.code)  return uni.showToast({
					title: '请输入验证码',
					icon: 'none',
					duration: 2000
				});
				this.loading = true
				this.$store.dispatch('loginByPhone', {
					code: this.code,
					phone: this.mobile
				}).then(res => {
					this.loading = false;
					uni.navigateBack()
				}).catch(_ => {
					this.loading = false
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.box{
	color: #4B5468;
	font-size: 28rpx;
	.box-top{
		padding: 70rpx 0 82rpx;
		color: rgba(0, 0, 0, 1);
		font-size: 72rpx;
		image{
			width: 120rpx;
			height: 120rpx;
			margin-right: 20rpx;
		}
	}
	.input-box{
		width: 644rpx;
		height: 122rpx;
		margin: 0 auto 52rpx;
		border-radius: 20rpx;
		background: rgba(252, 252, 252, 1);
		box-shadow: 0rpx 4rpx 30rpx  rgba(229, 229, 229, 0.25);
		font-weight: 400;
		font-size: 36rpx;
		.input-box-text{
			padding:0 20rpx;
			color: rgba(75, 84, 104, 1);
		}
		.input-box-input{
			flex: 2;
			padding: 10rpx 20rpx;
			input{
				height: 80rpx;
				line-height: 100rpx;
			}
		}
	}
	.box-tip{
		font-size: 32rpx;
		line-height: 60rpx;
		color: rgba(0, 0, 0, 1);
	}
	.login-btn{
		font-weight: bold;
		font-size: 56rpx;
		background: rgba(0, 186, 173, 1);
		width: 316rpx;
		line-height: 140rpx;
		text-align: center;
		border-radius: 70rpx;
		margin: 46rpx auto;
		color: #fff;
	}
	.login-img{
		margin-top: 18rpx;
		width: 292rpx;
		height: 292rpx;
	}
	.box-text{
		font-size: 22rpx;
		padding: 26rpx 0 30rpx;
		color: #131B2A;
	}
}
</style>
