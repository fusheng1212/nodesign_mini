import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	wxCodeLogin,
	wxSmallLogin,
	loginByPhone,
	getMemberInfo
} from '@/api/user.js'
const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || {}, // 用户基础信息
		loginUserType: 0, // 0游客
		Authorization: uni.getStorageSync('Authorization') || null
	},
	mutations: {
		// 用户基础信息
		updateUserInfo(state, basicUserInfo) {
			state.userInfo = basicUserInfo;
			uni.setStorageSync('userInfo', basicUserInfo)
		},
		// 登录验证信息
		updateAuthorization(state, Authorization) {
			state.Authorization = Authorization;
			uni.setStorageSync('timeOut', new Date().getTime())
			uni.setStorageSync('Authorization', Authorization)
		},
		// 当前浏览模式
		updateLoginUserType(state, loginUserType) {
			state.loginUserType = loginUserType;
		},
		updataStatus(state, status) {
			state.projectInfo.step = status;
			uni.setStorageSync('status', status)
		},
		logout(state){
			state.userInfo = {}
			state.Authorization = null
			uni.clearStorageSync()
		},
		updateProjectInfo(state,projectInfo){
			state.projectInfo = projectInfo;
			uni.setStorageSync('projectInfo', projectInfo)
		}
	},
	actions: {
		// 获取code
		wxLogin() {
			return new Promise(function(resolve, reject) {
				uni.login({
					success: res => {
						resolve(res);
					},
					fail: res => {
						reject()
					}
				})
			})
		},
		// 验证登录
		wxCheckSession() {
			return new Promise(function(resolve, reject) {
				uni.checkSession({
					success: res => {
						resolve(1);
					},
					fail: res => {
						console.log('error', res)
						resolve(2)
					}
				})
			})
		},
		// 手机号验证码登录
		loginByPhone({
			commit
		}, userInfo) {
			let _this = this
			return new Promise(function(resolve, reject) {
				loginByPhone(userInfo).then(res => {
					commit('updateAuthorization', res.token)
					commit('updateUserInfo', res)
					resolve()
				}).catch(_ => {
					reject()
				})
			})
		},
		// 登出
		logout({
			commit
		}){
			commit('logout')
		}
	}
})

export default store
