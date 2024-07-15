// 自己封装的 uni.request 工具类
var request = require("./request.js");
var jweixin = require('./jweixin-1.6.0.js');
import {
	get_wxKey
} from '@/api/index.js'
export default {
	//判断是否在微信中  
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			// console.log('是微信客户端')
			return true;
		} else {
			// console.log('不是微信客户端')
			return false;
		}
	},
	//初始化sdk配置  
	initJssdkShare: function(callback, url) {
		get_wxKey({
			urlStr: url
		}).then(jssdkInfo => {
			jweixin.config({
				debug: false,
				appId: jssdkInfo.appid,
				// appId: 'wx80bf7030a8ed3280',
				timestamp: jssdkInfo.timestamp,
				nonceStr: jssdkInfo.noncestr,
				signature: jssdkInfo.signature,
				jsApiList: ['scanQRCode']
			});
			callback(jssdkInfo)
		})
	},
	//在需要自定义分享的页面中调用  
	share: function(data, url) {
		url = url ? url : window.location.href;
		if (!this.isWechat()) {
			return;
		}
		//每次都需要重新初始化配置，才可以进行分享  
		this.initJssdkShare(function(signData) {
			jweixin.ready(function() {
				var shareData = {
					title: data && data.title ? data.title : signData.site_name,
					desc: data && data.desc ? data.desc : signData.site_description,
					link: url,
					imgUrl: data && data.img ? data.img : signData.site_logo,
					success: function(res) {
						// 分享后的一些操作,比如分享统计等等
					},
					cancel: function(res) {}
				};
				//分享给朋友接口  
				jweixin.onMenuShareAppMessage(shareData);
				//分享到朋友圈接口  
				jweixin.onMenuShareTimeline(shareData);
			});
		}, url);
	},
	wxScanQRCode: function(url) {
		let _this = this
		return new Promise(function(resolve, reject) {
			url = url ? url : window.location.href;
			if (_this.isWechat()) {
				_this.initJssdkShare(function(signData) {
					jweixin.ready(function() {
						jweixin.checkJsApi({
							jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
							success: function(res) {
								// 以键值对的形式返回，可用的api值true，不可用为false
								// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
								jweixin.scanQRCode({
									needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
									scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
									success: function(data) {
										// 设置成功
										var result = data.resultStr; // 当needResult 为 1 时，扫码返回的结果
										console.log(111,result)
										resolve(result)
									}
								})
							}
						});
					})
				},url)
			}else{
				reject()
			}
		})
		
	}
}
