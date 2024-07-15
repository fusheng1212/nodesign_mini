/**
 * 拼接对象为请求字符串
 * 对于需要编码的文本（比如说中文）我们要进行编码
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 **/
let _debounceTimeout = null,
		_throttleRunning = false
export default {
	//得到今天是周几
	getWeek(n) {
		var str = "";
		var week = new Date(n).getDay();
		if (week == 0) {
			str = "周日";
		} else if (week == 1) {
			str = "周一";
		} else if (week == 2) {
			str = "周二";
		} else if (week == 3) {
			str = "周三";
		} else if (week == 4) {
			str = "周四";
		} else if (week == 5) {
			str = "周五";
		} else if (week == 6) {
			str = "周六";
		}
		return str
	},
	formatGetUri(obj) {
		const params = []
		if (!obj) return '';
		Object.keys(obj).forEach((key) => {
			let value = obj[key]
			if (typeof value !== 'undefined' || value !== null) {
				params.push([key, encodeURIComponent(value)].join('='))
			}
		})
		return '?' + params.join('&')
	},

	/**
	 * 精确判断数据是否是 Object 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isObject(val) {
		return Object.prototype.toString.call(val) === '[object Object]' && val !== null && val !== undefined;
	},

	/**
	 * 判断数据是否是 Array 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isArray(val) {
		return Object.prototype.toString.call(val) === '[object Array]';
	},

	/**
	 * 判断数据是否是 String 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isString(val) {
		return Object.prototype.toString.call(val) === '[object String]';
	},

	/**
	 * 精确判断数据是否是 Date 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isDate(val) {
		return Object.prototype.toString.call(val) === '[object Date]';
	},

	/**
	 * 精确判断数据是否是 Function 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isFunction(val) {
		return Object.prototype.toString.call(val) === '[object Function]';
	},

	/**
	 * 精确判断数据是否是 Number 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isNumber(val) {
		return Object.prototype.toString.call(val) === '[object Number]';
	},

	/**
	 * 精确判断数据是否是 Boolean 类型
	 * @param {Any} val 要判断的数据
	 * @returns {Boolean} true：是；false：不是；
	 */
	isBoolean(val) {
		return Object.prototype.toString.call(val) === '[object Boolean]';
	},

	/**
	 * 判断 URL 是否是绝对 URL。
	 * @param {String} url 要判断的 URL
	 * @return {Boolean} true：是绝对URL；false：不是绝对URL；
	 */
	isAbsoluteURL(url) {
		// 如果 URL 以 “<scheme>：//” 或 “//”（协议相对URL）开头，则认为它是绝对的
		// RFC 3986 将方案名称定义为以字母开头的字符序列，然后是字母，数字，加号，句点或连字符的任意组合
		return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	},

	/**
	 * 深度合并对象，只支持合并两个对象，该方法不会改变原有的对象
	 * @param {Object} FirstOBJ 第一个对象
	 * @param {Object} SecondOBJ 第二个对象
	 * @return {Object} 返回深度合并后的对象
	 */
	deepMargeObject(FirstOBJ, SecondOBJ) {
		let ResultOBJ = {};
		for (let key in FirstOBJ) {
			ResultOBJ[key] = ResultOBJ[key] && ResultOBJ[key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
				key], FirstOBJ[key]) : ResultOBJ[key] = FirstOBJ[key];
		}
		for (let key in SecondOBJ) {
			ResultOBJ[key] = ResultOBJ[key] && ResultOBJ[key].toString() === "[object Object]" ? this.deepMargeObject(ResultOBJ[
				key], SecondOBJ[key]) : ResultOBJ[key] = SecondOBJ[key];
		}
		return ResultOBJ;
	},

	/**
	 * 生成指定长度的随机字符串
	 * @param {Number} min 最小程度
	 * @param {Number} max 最大长度
	 * @return {String} 返回生成的字符串
	 */
	randomString(min, max) {
		let returnStr = "",
			range = (max ? Math.round(Math.random() * (max - min)) + min : min),
			arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
				'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
			];
		for (let i = 0; i < range; i++) {
			let index = Math.round(Math.random() * (arr.length - 1));
			returnStr += arr[index];
		}
		return returnStr;
	},

	/**
	 * 获取指定日期后的时间数据
	 * @param {Date|String} date 日期或日期字符串
	 * @param {num|Number} num 获取多少天数据
	 */
	getTimeList(num, date) {
		let list = new Array()
		let startDay = date && date != '' ? new Date(date.replace(/-/g, '/')) : new Date()
		console.log(startDay)
		let weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		let sYear = startDay.getFullYear();
		let sMonth = startDay.getMonth() + 1;
		let sDate = startDay.getDate();
		let sWeek = startDay.getDay();
		sMonth = sMonth >= 10 ? sMonth : '0' + sMonth;
		sDate = sDate >= 10 ? sDate : '0' + sDate;
		sWeek = weekList[sWeek]
		list.push({
			date: sYear + "-" + sMonth + "-" + sDate,
			week: sWeek
		})
		for (var i = 0; i < num; i++) {
			let nextDay = new Date();
			nextDay.setTime(startDay.getTime() + 1000 * 60 * 60 * 24 * (i + 1))
			let nYear = nextDay.getFullYear();
			let nMonth = nextDay.getMonth() + 1;
			let nDate = nextDay.getDate();
			let nWeek = nextDay.getDay();
			nMonth = nMonth >= 10 ? nMonth : '0' + nMonth;
			nDate = nDate >= 10 ? nDate : '0' + nDate;
			nWeek = weekList[nWeek]
			list.push({
				date: nYear + "-" + nMonth + "-" + nDate,
				week: nWeek
			})
		}
		return list
	},
	// 获取一个月后的日期
	getAfterMonth(dtstr, n) {
		var s = dtstr.split("-");
		var dd = parseInt(s[2]) < 10 ? '0' + parseInt(s[2]) : parseInt(s[2]);
		var dt = new Date(dtstr);
		dt.setMonth(dt.getMonth() + n);
		var month = (parseInt(dt.getMonth()) + 1) < 10 ? '0' + (parseInt(dt.getMonth()) + 1) : parseInt(dt.getMonth()) + 1;
		return dt.getFullYear() + "-" + month + "-" + dd;
	},

	/**
	 * 格式化日期
	 * @param {Date|String} date 日期或日期字符串
	 */
	formatDate(date) {
		let YYYY = null;
		let M = null;
		let MM = null;
		let D = null;
		let DD = null;
		let h = null;
		let hh = null;
		let m = null;
		let mm = null;
		let s = null;
		let ss = null;
		let ms = null;
		let ms2 = null;
		let ms3 = null;
		let ms4 = null;
		let dt = null;
		let mouthEnd = null; //当月结束日期

		// 如果 date 是 String 类型
		if (date && Object.prototype.toString.call(date) === '[object String]') {
			// 真机运行时，如果直接用 new Date('YYYY-MM-DD hh:mm:ss') 会报 Invalid Date 错误，所以采用下面的方式创建日期
			let dtArr = date.replace(/\//g, '.').replace(/-/g, '.').replace(/:/g, '.').replace(/T/g, ' ').replace(' ', '.').replace(
				'Z', '').split('.');

			let year = 2020;
			let month = 12;
			let day = 18;
			let hour = 0;
			let minute = 0;
			let second = 0;
			let millisecond = 0;

			// 年
			if (dtArr.length > 0 && !isNaN(dtArr[0])) {
				year = parseInt(dtArr[0]);
			}
			// 月
			if (dtArr.length > 1 && !isNaN(dtArr[1])) {
				month = parseInt(dtArr[1]);
			}
			// 日
			if (dtArr.length > 2 && !isNaN(dtArr[2])) {
				day = parseInt(dtArr[2]);
			}
			// 时
			if (dtArr.length > 3 && !isNaN(dtArr[3])) {
				hour = parseInt(dtArr[3]);
			}
			// 分
			if (dtArr.length > 4 && !isNaN(dtArr[4])) {
				minute = parseInt(dtArr[4]);
			}
			// 秒
			if (dtArr.length > 5 && !isNaN(dtArr[5])) {
				second = parseInt(dtArr[5]);
			}
			// 毫秒
			if (dtArr.length > 6 && !isNaN(dtArr[6])) {
				millisecond = parseInt(dtArr[6]);
			}

			date = new Date(year, month - 1, day, hour, minute, second, millisecond);
		}

		// 如果 date 是 Date 类型
		if (date && Object.prototype.toString.call(date) === '[object Date]') {
			YYYY = date.getFullYear();
			M = date.getMonth() + 1;
			MM = M >= 10 ? M : '0' + M;
			D = date.getDate();
			DD = D >= 10 ? D : '0' + D;
			h = date.getHours();
			hh = h >= 10 ? h : '0' + h;
			m = date.getMinutes();
			mm = m >= 10 ? m : '0' + m;
			s = date.getSeconds();
			ss = s >= 10 ? s : '0' + s;
			ms = date.getMilliseconds();
			ms2 = ms;
			ms3 = ms;
			ms4 = ms;
			let lastDate = new Date(YYYY, M, 0).getDate()
			lastDate = lastDate >= 10 ? lastDate : '0' + lastDate;
			mouthEnd = `${YYYY}-${MM}-${lastDate}`
			if (ms < 10) {
				ms2 = '0' + ms;
				ms3 = '00' + ms;
				ms4 = '000' + ms;
			} else if (ms < 100) {
				ms3 = '0' + ms;
				ms4 = '00' + ms;
			} else {
				ms4 = '0' + ms;
			}
		}

		// 返回的数据对象
		let result = {
			YYYY: YYYY,
			MM: MM,
			M: M,
			DD: DD,
			D: D,
			hh: hh,
			h: h,
			mm: mm,
			m: m,
			ss: ss,
			s: s,
			ms: ms,
			ms2: ms2,
			ms3: ms3,
			ms4: ms4,
			dt: date,
			mouthEnd: mouthEnd,
			f1: `${YYYY}-${MM}-${DD}`,
			f2: `${YYYY}年${M}月${D}日`,
			f3: `${YYYY}-${M}-${D} ${hh}:${mm}`,
			f4: `${h}:${m}:${s}`,
			f5: `${MM}-${DD}`,
			f6: `${YYYY}-${MM}`,
			f7: `${YYYY}年${M}月`,
			f8: `${h}:${m}`,
			f9: `${M}月${D}日`,
			f10: `${YYYY}.${MM}.${DD}`,
			f11: `${YYYY}-${MM}-${DD} ${hh}:${mm}`,
			f12: `${YYYY}.${MM}.${DD} ${hh}:${mm}`,
			notes: 'YYYY（年），MM（月，补0），M（月，不补0），DD（日，补0），D（日，不补0），hh（时，补0），h（时，不补0），mm（分，补0），m（分，不补0），ss（秒，补0），s（秒，不补0），ms（毫秒，不补0），ms2（毫秒，补0到2位），ms3（毫秒，补0到3位），ms4（毫秒，补0到4位），其余的f1，f2，... 看格式就知道了！'
		};
		return result;
	},

	/**
	 * 数字转中文
	 * @param {Number} num 数字
	 */
	numberToChinese(num) {
		if (!/^\d*(\.\d*)?$/.test(num)) return "Number is wrong!";
		let AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九");
		let BB = new Array("", "十", "百", "千", "万", "亿", "点", "");
		let a = ("" + num).replace(/(^0*)/g, "").split("."),
			k = 0,
			re = "";
		for (let i = a[0].length - 1; i >= 0; i--) {
			switch (k) {
				case 0:
					re = BB[7] + re;
					break;
				case 4:
					if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0]))
						re = BB[4] + re;
					break;
				case 8:
					re = BB[5] + re;
					BB[7] = BB[5];
					k = 0;
					break;
			}
			if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
			if (a[0].charAt(i) != 0) re = (a[0].length == 2 && a[0].charAt(i) == 1 && i == 0 ? '' : AA[a[0].charAt(i)]) + BB[k %
				4] + re;
			k++;
		}
		if (a.length > 1) //加上小数部分(如果有小数部分)
		{
			re += BB[6];
			for (let i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
		}
		return re;
	},

	/**
	 * 验证手机号码
	 * @param {Number} num 数字
	 */
	checkMobile(value) {
		return /^1[3-9]\d{9}$/.test(value);
	},
	// 验证邮箱
	checkEmail(value){
		return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value);
	},
	// 验证身份证号
	checkCode(value){
		return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/.test(value);
	},
	// 各类证件号验证 type 0:"身份证",1:"护照",2:"台胞证",3:"回乡证"
	checkCodeByType(value,type){
		let reg = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}[0-9Xx]$)/	
		type == 1 && (reg = /^([a-zA-z]|[0-9]){5,17}$/)
		type == 2 && (reg = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/)
		type == 3 && (reg = /^(H|M)(\d{8,10})$/)
		return reg.test(value)
	},
	
	// 验证银行卡号
	checkBankCard(value){
		return /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{18})$/.test(value);
	},

	// 价格保留2位小数
	toFixed(num) {
		if (num === '' || num === undefined || num === null  || num === 'null') return 0.00
		return Number(num).toFixed(2)
	},

	// 时间差
	timeReduce(date) {
		let now = new Date()
		let oldDate = new Date(date.replace('T', ' ').replace(/-/g, '/'))
		return Math.round((now.getTime() - oldDate.getTime()) / 60000)
	},
	findItem(arr, id, idKey) {
		let Item = arr.find(function(x) {
			return x[idKey] === id
		});
		return Item;
	},
	// 处理富文本图片大小
	replaceDetail(details) {
		var texts = ''; //待拼接的内容
		if (!details) return '暂无描述'
		while (details.indexOf('<img') != -1) { //寻找img 循环
			texts += details.substring('0', details.indexOf('<img') + 4); //截取到<img前面的内容
			details = details.substring(details.indexOf('<img') + 4); //<img 后面的内容
			if (details.indexOf('style=') != -1 && details.indexOf('style=') < details.indexOf('>')) {
				texts += details.substring(0, details.indexOf('style="') + 7) + "max-width:100%;height:auto;margin:0 auto;"; //从 <img 后面的内容 截取到style= 加上自己要加的内容
				details = details.substring(details.indexOf('style="') + 7); //style后面的内容拼接
			} else {
				texts += ' style="max-width:100%;height:auto;margin:0 auto;" ';
			}
		}
		texts += details; //最后拼接的内容
		return texts
	},
	// 截断显示
	encryption(str, type) {
		if(!str){
			return '***'
		}
		if (type == 'phone') {
			return str.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")
		}
		if (type == 'idcard') {
			return str.replace(/(\d{5})(\d{9}|\d{6})(\w{4})/, "$1*********$3")
		}
		if (type == 'name'){ // 姓名
			if(str.length == 2){
				return str[0] + '*'
			}
			return str.replace(/(\S{1})(\S+)(\S{1})/, "$1**$3")
		}
	},
	// 倒计时格式化
	downTimeFormat(param){
		let _param = param - 0;
		let time = ''
		if(_param&&_param!==''){
			let hour = parseInt(_param/(60*60)%60);
			let minutes = parseInt(_param/60%60);
			let seconds = parseInt(_param%60);
			let _hour = hour<10?'0'+hour:hour;
			let _minutes = minutes<10?'0'+minutes:minutes;
			let _seconds = seconds<10?'0'+seconds:seconds;
			time = _hour + ':' + _minutes + ':' + _seconds;
		}else{
			time = '00:00:00'
		}
		return time;
	},
	// 百度地图经纬度转腾讯
	bdMap_to_txMap($lng,$lat){
	    let $x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	    let $x = $lng - 0.0065;
	    let $y = $lat - 0.006;
	    let $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi);
	    let $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi);
	    $lng = $z * Math.cos($theta);
	    $lat = $z * Math.sin($theta);
	    return [$lng,$lat]
	},
	// 腾讯地图经纬度转百度
	txMap_to_bdMap($lng,$lat){
	    let $x_pi = Math.PI * 3000.0 / 180.0;
	    let $x = $lng;
	    let $y = $lat;
	    let $z = Math.sqrt($x * $x + $y * $y) + 0.00002 * Math.sin($y * $x_pi);
	    let $theta = Math.atan2($y, $x) + 0.000003 * Math.cos($x * $x_pi);
	    $lng = $z * Math.cos($theta) +0.0065;
	    $lat = $z * Math.sin($theta) + 0.006;
	    return [$lng,$lat]
	},
	getHttps(src,w,h){
		if(src){
			if(!w || !h){
				return src.replace('http://', 'https://')
			}
		}else{
			return ''
		}
	},
	
	getUrlParams(url) {
	    var obj = {}
	    if (url) {
	        if (url.indexOf('?') === -1) {
	            return obj
	        } else {
	            var index = url.indexOf('?')
	            var str = url.substring(index + 1)
	            if (str.indexOf('&') !== -1) {
	                var arr1 = str.split('&')
	                arr1.forEach(function (val, index) {
	                    var arr2 = val.split('=')
	                    obj[arr2[0]] = arr2[1]
	                })
	            } else {
	                var arr3 = str.split('=')
	                obj[arr3[0]] = arr3[1]
	            }
	            return obj
	        }
	    }
	},
	
	/**
	 * 日期转换为距离当前日期时间差
	 */
	convertTime(timeDate){
		if(!timeDate){
			return '0分钟前'
		}
		let showTime = new Date(timeDate.replace(/-/g,'/'))
		let differ = (new Date() - showTime) / 1000
		let day = parseInt(differ / (60 * 60 * 24));
		let hour = parseInt(differ / (60 * 60) % 60);
		let minutes = parseInt(differ / 60 % 60);
		let seconds = parseInt(differ % 60);
		if(day>20){
			return this.formatDate(timeDate).f1;
		}
		if(day>0){
			return day + '天前'
		}
		if(hour>0){
			return hour + '小时前'
		}
		if(minutes>0){
			return minutes + '分钟前'
		}
		if(seconds >= 0){
			return seconds + '秒前'
		}
	},
	
	/**
	 * 防抖
	 *  {Function} 执行函数
	 * {Number} delay 延时ms
	 */
	debounce(fn, delay = 500){
		clearTimeout(_debounceTimeout);
		_debounceTimeout = setTimeout(() => {
			fn();
		}, delay);
	},
	/**
	 * 节流
	 *  {Function} 执行函数
	 *  {Number} delay 延时ms
	 */
	throttle(fn, delay = 500){
		if (_throttleRunning) {
			return;
		}
		_throttleRunning = true;
		fn();
		setTimeout(() => {
			_throttleRunning = false;
		}, delay);
	},
	/**
	 * 页面跳转
	 * @param {Number} url 跳转地址
	 * @param {String}  type 跳转方式
	 */
	jumpFor(url,type = 'navigate'){
		switch(type){
			case 'navigate':  //保留当前页面，跳转到应用内的某个页面
			uni.navigateTo({
				url: url
			})
			break;
			case 'redirect': //关闭当前页面，跳转到应用内的某个页面。
			uni.redirectTo({
				url: url
			})
			break;
			case 'switchTab': //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
			uni.switchTab({
				url: url
			})
			break;
			case 'reLaunch': // 关闭所有页面，打开到应用内的某个页面
			uni.reLaunch({
				url: url
			})
			break;
		}
	}
}
