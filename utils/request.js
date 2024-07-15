import urlConfig from './config.js'
import store from './store.js'
const request = {}
const headers = {}
/*
	contentType: 请求参数类型
	loading: 是否显示加载中弹窗
	showError: 是否显示接口异常弹窗
	HOST: 接口域名
*/
request.globalRequest = (url, method, data,contentType='application/json',loading = true,showError = true,HOST = 'HOST') => {
/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分 */

	store.state.Authorization && (headers['token'] = store.state.Authorization); //token信息
	headers['from'] = 'mini';
	headers['Content-Type'] = contentType
    let urlBasic = urlConfig[HOST]
	loading &&  uni.showLoading({
      title: '努力加载中..', 
      mask: true
    })
	
    return uni.request({
        url: urlBasic + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		loading &&  uni.hideLoading()
		if(res[1].data.code && res[1].data.code == 1) {
		    return res[1].data.data
		} else {
		    throw res[1].data || res[1]
		}
    }).catch(parmas => {
		loading &&  uni.hideLoading()
		switch (parmas.code || parmas.statusCode) {
			case 401: //登录失效
				uni.clearStorageSync()
				store.dispatch('logout')
				uni.navigateTo({
					url: '/pages/login/login'
				})
				return Promise.reject(parmas.message)
				break;
			case 200:
				return Promise.resolve(parmas.data)
				break;
			default:
				showError && uni.showToast({
					title: parmas.message || parmas.msg,
					icon: 'none',
				})
				return Promise.reject(parmas.message)
				break;
　　　　 }
　　})
 } 
 export default request